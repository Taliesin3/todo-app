import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function UserPage() {
  return (
    <Route path="/user">
      <div>
      <Router>
        <Switch>
          <Route path="/user" exact component={Login} />
          <Route path="/user/register" component={Register} />
        </Switch>
      </Router>
      </div>
    </Route>
  )
}