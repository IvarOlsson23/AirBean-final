import { useHistory } from "react-router-dom";
import navicon from "../media/nav-icon.png";
import "../css/Header.css";

function Header() {
  let history = useHistory();

  return (
    <div className="Header">
      <div className="NavIcon">
        <img
          src={navicon}
          onClick={() => {
            history.push("/navigation");
          }}
          alt="Icon"
          className="MenuIcon"
        />
      </div>
    </div>
  );
}

export default Header;
