import React from "react";
import { Route, Redirect } from "react-router-dom";

export  const ProtectedRoute = ({component: Component, ...rest}) => {
  const token = localStorage.getItem("auth-token");

  return (
    <Route 
      {...rest}
      render={props => {
        return token ? <Component {...props} /> :
        <Redirect to={
          {
            pathname: "/user/login",
            state: {
              from: props.location
            }
          }
        } />
      }}
    />
  );
}