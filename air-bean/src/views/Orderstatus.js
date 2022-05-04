import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "../css/Orderstatus.css";
import drone from "../media/dronecup.png";
function Orderstatus() {
  let history = useHistory();
  const arrival = useSelector((state) => state.arrivaltime);

  const time = new Date();
  time.setMinutes(time.getMinutes());
  const timeCurrent = Date.parse(time);
  let deliveryTime = Math.round(
    (Date.parse(arrival.eta) - timeCurrent) / 60000
  );

  useEffect(() => {
    async function fetchTimeLeft() {
      if (deliveryTime < 0) {
        return <p>Hoppas det smakar!</p>;
      } else {
        return deliveryTime;
      }
    }
    fetchTimeLeft();
  });
  return (
    <div className="orderstatus">
      <p>Ordernummer: #{arrival.id} </p>
      <img src={drone} alt="drone-img" className="drone"></img>
      {deliveryTime <= 0 && <h2>Din beställning är klar!</h2>}
      {deliveryTime > 0 && <h2>Din beställing är påväg</h2>}

      {deliveryTime <= 0 && <p>Ditt kaffe har anlänt!</p>}
      {deliveryTime > 0 && <p>{deliveryTime} minuter kvar!</p>}

      <input
        onClick={() => {
          history.push("/menu");
        }}
        className="cool-btn"
        type="submit"
        value="Ok, cool!"
      ></input>
    </div>
  );
}

export default Orderstatus;
