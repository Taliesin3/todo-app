import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

export  const ProtectedRoute = ({component: Component, ...rest}) => {
  const token = localStorage.getItem("auth-token");

  return (
    <Route 
      {...rest}
      render={props => {
        return token ? <Component {...props} /> :
        <Redirect to={
          {
            pathname: "/",
            state: {
              from: props.location
            }
          }
        } />
      }}
    />
  );
}