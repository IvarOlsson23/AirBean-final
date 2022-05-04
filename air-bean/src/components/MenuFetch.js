import addbtn from "../media/add.png";
import { useEffect } from "react";
import axios from "axios";
import { addProduct, setQuantity, setCartCounter } from "../actions/menuAction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "../css/Menu.css";

function MenuFetch() {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(1);
  const quantity = 1;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/coffee`).then((res) => {
      setMenu(res.data);
    });
  }, []);

  useEffect(() => {});

  const addToCart = (menu) => {
    setCart([...cart, menu]);
    dispatch(addProduct([...cart, menu]));
    dispatch(setQuantity(quantity));
    setAmount(amount + 1);
    dispatch(setCartCounter(amount));
    console.log(quantity, "quantity");
  };

  return (
    <div className="menu">
      <h1>Meny</h1>

      <div className="beans">
        {menu &&
          menu.map((menu, index) => {
            return (
              <div className="unik-product" key={index}>
                <img
                  onClick={() => addToCart(menu)}
                  src={addbtn}
                  alt="add"
                  className="add-btn"
                ></img>
                <div className="product-name">
                  <h1>{menu.title}</h1>
                  <p>{menu.desc}</p>
                </div>
                <p className="product-price">{menu.price}kr</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MenuFetch;
