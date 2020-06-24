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
import Result from "./Component/Result";



function App() {
  return (
    <Router>
      <ul className="text-center m-2">
        <NavLink to="/" className="nav-link" activeClassName="nav-link-active" exact>
          Home
        </NavLink>
        /
        <NavLink to="/battle" className="nav-link" activeClassName="nav-link-active" exact>
          Battle
        </NavLink>
        /
        <NavLink to="/result" className="nav-link" activeClassName="nav-link-active" exact>
          Result
        </NavLink>
      </ul>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/battle" exact>
          <Battle />
        </Route>
        <Route path="/result">
          <Result />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
