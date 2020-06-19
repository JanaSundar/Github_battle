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

function App() {
  return (
    <Router>
      <ul>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        /
        <NavLink to="/battle" className="nav-link">
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
