import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import Form from "./form";
import Home from "../App";

// Here, we display our Navbar
const Navbar = () => {
  return (
      <nav>
      <Link style={{margin: 8}} to="/">Home</Link>
          <Link to={"/form"} className="navbar-brand">
            Create ArtWalk
          </Link>
          <div className="container mt-3">
          <Switch>
            <Route path="/form" component={Form} />
          </Switch>
        </div>
      </nav>
  );
};

export default Navbar;