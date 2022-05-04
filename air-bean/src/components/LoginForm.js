import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../css/Form.css";
import logo from "../media/airbean-icon.png";
import {
  setUsername,
  addEmail,
  addProduct,
  setArrival,
} from "../actions/Actions";

function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [values, setValues] = useState({
    username: "",
    email: "",
  });

  function handle(e) {
    const newvalues = { ...values };
    newvalues[e.target.id] = e.target.value;
    setValues(newvalues);
    console.log(newvalues);
    dispatch(setArrival([]));
  }
  dispatch(setUsername(values.username));
  dispatch(addEmail(values.email));
  dispatch(addProduct([]));

  const CreateAccount = async () => {
    try {
      const resp = await axios.post("http://localhost:5000/api/account", {
        username: values.username,
        email: values.email,
      });
      console.log(resp.data);

      history.push("/menu");
    } catch (err) {}
  };
  return (
    <div className="form">
      <img className="logo" alt="logo" src={logo} />
      <h1 className="header">Välkommen till AirBean-familjen!</h1>
      <p className="login-info">
        Genom att skapa ett konto nedan kan du spara och se din orderhistorik.
      </p>
      {/* NAME */}
      <div className="name">
        <div className="label">Namn</div>
        <input
          className="input-form"
          type="text"
          name="username"
          onChange={(e) => handle(e)}
          id="username"
          value={values.username}
        />
      </div>
      {/* NAME */}

      {/* EMAIL */}
      <div className="email">
        <div className="label">Epost</div>
        <input
          className="input-form"
          type="text"
          name="email"
          onChange={(e) => handle(e)}
          id="email"
          value={values.email}
        />
      </div>
      {/* EMAIL */}
      {/* GDPR */}
      <div className="gdpr">
        <input type="radio" id="checkbox" />
        <label className="gdpr-text">GPDR Ok!</label>
      </div>

      <input
        className="login-btn"
        type="submit"
        value="Logga in"
        onClick={CreateAccount}
      />
    </div>
  );
}

export default Form;
