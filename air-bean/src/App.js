import "./App.css";
import Login from "./views/Login";
import About from "./views/About";
import Menu from "./views/Menu";
import { Route, Switch } from "react-router-dom";
import Profile from "./views/Profile";
import Orderstatus from "./views/Orderstatus";
import Nav from "./views/Nav";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/menu" component={Menu} exact />
        <Route path="/about" component={About} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/orderstatus" component={Orderstatus} exact />
        <Route path="/navigation" component={Nav} exact />
      </Switch>
    </div>
  );
}

export default App;
