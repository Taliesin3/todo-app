import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NotePage from "./NotePage";
import UserPage from "./UserPage";
import ErrorPage from "./ErrorPage";

export default function App() {
   
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={NotePage} />
          <Route path="/user" component={UserPage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}