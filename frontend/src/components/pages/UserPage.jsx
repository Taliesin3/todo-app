import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";

export default function UserPage() {
  const token = localStorage.getItem("auth-token");
  
  // TODO: /notes below shouldnt be hard coded, improve "/" route to handle routing better?
  return token ? <Redirect to="/notes" /> : (
    
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