const lowdb = require("lowdb");
const express = require("express");
const FileSync = require("lowdb/adapters/FileSync");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const adapter = new FileSync("accounts.json");
const adapter2 = new FileSync("menu.json");
const db = lowdb(adapter);
const db2 = lowdb(adapter2);

const app = express();
app.use(cors());
app.use(express.json());

function initiateDatabase() {
  db.defaults({ accounts: [], orders: [] }).write();
  db2.defaults({ menu: [] }).write();
}

app.get("/api/coffee", (_request, response) => {
  try {
    const menu = db2.get("menu").value();
    return response.json(menu);
  } catch (_error) {
    return response.status(500).json("Internal server error");
  }
});

app.post("/api/account", (request, response) => {
  const { username, email } = request.body;
  console.log("Konto att lägga till:", username, email);

  if (!username || !email) {
    return response.status(400).json("Bad request");
  }

  const usernameExists = db.get("accounts").find({ username }).value();
  const emailExists = db.get("accounts").find({ email }).value();

  if (usernameExists || emailExists) {
    return response.status(409).json("Email or username already exists");
  }

  try {
    db.get("accounts").push({ username, email }).write();
    return response.status(201).json("Registered account successfully");
  } catch (error) {
    console.error(error);
    return response.status(500).json("Internal server error");
  }
});

app.post("/api/order", (request, response) => {
  const { username, items } = request.body;
  console.log("Order att lägga:", username, items);

  if (!username || !items || !items.length) {
    return response.status(400).json("Bad request");
  }

  const usernameExists = db.get("accounts").find({ username }).value();
  if (!usernameExists) {
    return response.status(401).json("Unauthorized");
  }

  try {
    const menuItems = db2.get("menu");
    const orderItems = [];
    for (const { id, quantity } of items) {
      const db2Item = menuItems.find({ id }).value();
      if (!db2Item) {
        return response
          .status(400)
          .json("One or more item in the order was not found");
      }
      const total = db2Item.price * quantity;
      orderItems.push({ quantity, total, ...db2Item });
    }
    const orderTotal = orderItems.reduce(
      (total, currentItem) => (total += currentItem.total),
      0
    );
    const eta = new Date();
    eta.setMinutes(eta.getMinutes() + 15);

    const id = uuidv4();

    db.get("orders")
      .push({ username, items: orderItems, total: orderTotal, eta, id })
      .write();

    return response.status(201).json({ eta, id });
  } catch (error) {
    console.error(error);
    return response.status(500).json("Internal server error");
  }
});

app.get("/api/order/:username", (request, response) => {
  const { username } = request.params;

  if (!username) {
    return response.status(400).json("Bad request");
  }

  try {
    const user = db.get("accounts").find({ username }).value();
    if (!user) {
      return response.status(404).json("Not found");
    }

    const orders = db.get("orders").filter({ username }).value();

    return response.json(orders);
  } catch (error) {
    console.error(error);
    return response.status(500).json("Internal server error");
  }
});

const PORT = 5000;

app.listen(5000, () => {
  console.info(`Server started on port ${PORT}`);
  initiateDatabase();
});
