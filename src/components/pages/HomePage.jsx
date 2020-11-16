import React, { useContext } from "react";
import NotePage from "../pages/NotePage";
import UserData from "../../context/UserContext";
import AuthOptions from "../auth/AuthOptions";
import UserContext from "../../context/UserContext";

export default function HomePage() {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <div>
    {userData.user ? (
      <NotePage />
    ) : (
      <div>
        <h1>Home Page</h1>
      </div>
    )}
    </div>
  )
}