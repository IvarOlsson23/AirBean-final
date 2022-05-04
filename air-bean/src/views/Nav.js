import closebtn from "../media/close-btn.png";
import "../css/Nav.css";
import { useHistory } from "react-router-dom";
function Nav() {
  let history = useHistory();
  return (
    <div className="nav">
      <div className="closenav-btn">
        <img
          onClick={() => {
            history.go(-1);
          }}
          src={closebtn}
          alt="closeimg"
        ></img>
      </div>
      <div className="nav-links">
        <p
          onClick={() => {
            history.push("/menu");
          }}
        >
          Meny
        </p>
        <div className="divider">-</div>
        <p
          onClick={() => {
            history.push("/about");
          }}
        >
          Vårt Kaffe
        </p>
        <div className="divider">-</div>
        <p
          onClick={() => {
            history.push("/profile");
          }}
        >
          Min profil
        </p>
        <div className="divider">-</div>
        <p
          onClick={() => {
            history.push("/orderstatus");
          }}
        >
          Orderstatus
        </p>
      </div>
    </div>
  );
}

export default Nav;
