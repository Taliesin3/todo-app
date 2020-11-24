import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";

export default function UserPage() {
  return (
    <Route path="/user">
      <div>
        <Switch>
          <Route path="/user/login" component={Login} />
          <Route path="/user/register" component={Register} />
        </Switch>
      </div>
    </Route>
  )
}