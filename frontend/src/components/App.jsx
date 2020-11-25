import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from "../context/UserContext";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import HomePage from "./pages/HomePage";
import NotePage from "./pages/NotePage";
import UserPage from "./pages/UserPage";
import ErrorPage from "./pages/ErrorPage";
import axios from "axios";

export default function App() {
  // user state, passed to context below
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
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
          } else {
            // check if token is valid
            const tokenRes = await axios.post(
              "/api/user/isTokenValid",
            null,      
            { headers: { "x-auth-token": token } }
          );
          console.log("Token check is: " + tokenRes.data);

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
        }
        
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
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/notes" component={NotePage} />
            <Route path="/user" component={UserPage} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </UserContext.Provider>
      </Router>
      <Footer />
    </div>
  );
}