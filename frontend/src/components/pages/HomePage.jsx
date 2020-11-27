import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function HomePage() {
  // Hooks
  const { userData } = useContext(UserContext);

  // Currently empty - may implement
  // proper landing page in future
  return (
    <div>
      {userData.isLoggedIn ? <Redirect to="/notes" /> : <Redirect to="/user/login" />}
    </div>
    
  )
}