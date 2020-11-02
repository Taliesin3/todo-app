import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

export default function UserPage() {
  return (
    <Route path="/user">
      <div>
      <Paper>
        <p>This is the User Page!</p>
      </Paper>
      </div>
    </Route>
  )
}