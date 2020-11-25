import React, { useContext, useEffect } from "react";
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function HomePage() {
  // Hooks
  const { userData } = useContext(UserContext);
  const history = useHistory();
  
  // Send to notes or login page
  // depending on login status
  // TODO: think there's a better way of doing this - redirect?
  useEffect(() => {
    userData.user ? 
      (history.push("/notes")) : 
      (history.push("/user/login"));
  }, [userData, history]);

  // Currently empty - may implement
  // proper landing page in future
  return (
    <div>
    </div>
  )
}