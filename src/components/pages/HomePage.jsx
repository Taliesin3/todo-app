import React, { useContext, useEffect } from "react";
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function HomePage() {
  // Hooks
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  // Send to notes or login page
  // depending on login status
  useEffect(() => {
    userData.user ? 
      (history.push("/notes")) : 
      (history.push("/user/login"));
  }, []);

  // Currently empty - may implement
  // proper landing page in future
  return (
    <div>
    </div>
  )
}