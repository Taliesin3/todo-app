import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from "../context/UserContext";
import NotificationContext from "../context/NotificationContext";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import HomePage from "./pages/HomePage";
import NotePage from "./pages/NotePage";
import UserPage from "./pages/UserPage";
import ErrorPage from "./pages/ErrorPage";
import Notification from "./misc/Notification";
import axios from "axios";

export default function App() {
  // user state, passed to context below
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [notification, setNotification] = useState({
    severity: undefined,
    message: undefined,
  });

  // Check if user is logged in
  useEffect(() => {
    // useEffect cannot be asynchronous, so we must define our
    // async function here and then call it at the end of our effect
    const checkLoggedIn = async () => {
      try {
        let token = localStorage.getItem("auth-token");
        
        // error thrown if token does not exist, so we must set
        // an empty token
        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        // check if token is valid
        const tokenRes = await axios.post(
          "/api/user/isTokenValid",
          null,      
          { headers: { "x-auth-token": token } }
        );
          
        // if a user is logged in, get user data
        if (tokenRes.data) {
          const userRes = await axios.get(
            "/api/user/",  
            {headers: { "x-auth-token": token } },
          );

          // set state as logged in user data, which is passed to context
          setUserData({
            token, 
            user: userRes.data,
          });
        }

        return console.log("Login check successful!");
        
      } catch (err) {
        console.log(err);
      }
    };

    checkLoggedIn();    
  }, []);
  
  return (
    <div>
      <Router>
        <UserContext.Provider value={{userData, setUserData}}>
        <NotificationContext.Provider value={{notification, setNotification}}>
          <Header />
          <Notification />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/notes" exact component={NotePage} />
            <Route path="/user" component={UserPage} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </NotificationContext.Provider>
        </UserContext.Provider>
      </Router>
      <Footer />
    </div>
  );
}