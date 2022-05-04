import bagIcon from "../media/bag.png";
import Overlay from "./Cartoverlay";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setArrival, addProduct } from "../actions/Actions";
import { useDispatch } from "react-redux";
import "../css/Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [toggled, setIsOpen] = useState(false);
  const products = useSelector((state) => {
    return state.products;
  });
  const name = useSelector((state) => state.user.name);
  let orderDetails = { username: name };
  const items = products.map((products) => {
    return { id: products.id, quantity: products.quantity };
  });
  orderDetails.items = items;

  /*********************/
  const toggleOverlay = () => {
    setIsOpen(!toggled);
  };
  useEffect(() => {
    if (toggled === true) {
    }
  }, [toggled]);
  /********************/

  const TotalPrice = products.reduce(function (x, y) {
    return x + y.price;
  }, 0);
  async function PlaceOrder() {
    const response = await fetch("http://localhost:5000/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    });
    const data = await response.json();
    dispatch(setArrival(data));
    dispatch(addProduct([]));
    history.push("/orderstatus");
  }

  return (
    <div>
      <div className="">
        <div className="cart-circle">
          <img
            src={bagIcon}
            alt="cart"
            className="bag-icon"
            onClick={toggleOverlay}
          />
          <span className="cart-counter">{products.length}</span>
        </div>
        <div className="">
          {toggled && (
            <Overlay
              content={
                <>
                  <div>
                    <h2>Din beställning</h2>
                    <div className="product-placed">
                      {products.map((products, index) => {
                        return (
                          <div className="product-inside" key={index}>
                            <div className="">
                              <p className="">{products.title}</p>
                              <p className="">{products.price}kr</p>
                            </div>
                            <span className="dotted">
                              ...........................
                            </span>
                            <p className="">{products.quantity}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="total-price">
                    <div className="total-moms">
                      <h3>Total</h3>
                      <p>ink moms + drönare</p>
                    </div>
                    <h2>{TotalPrice}kr</h2>
                  </div>
                  <button onClick={PlaceOrder} className="take-my-money">
                    Take my money!
                  </button>
                </>
              }
              handleClose={toggleOverlay}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
