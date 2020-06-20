import React from "react";
import "./App.css";
import Home from "./Component/Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import Battle from "./Component/Battle";

const active = {
  fontSize: "1.2rem",
  color: "#ee4266",
};

function App() {
  return (
    <Router>
      <ul className="text-center m-2">
        <NavLink to="/" className="nav-link" activeStyle={active} exact>
          Home
        </NavLink>
        /
        <NavLink
          to="/battle"
          className="nav-link"
          activeStyle={active}
          exact
        >
          Battle
        </NavLink>
      </ul>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/battle">
          <Battle />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
