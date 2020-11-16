import React, { useContext } from "react";
import { Link } from "@material-ui/core";
import { Button } from "@material-ui/core";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData }   = useContext(UserContext);
  
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  }

  return (
    <nav>
    {userData.user ? (
      <Button onClick={logout}>Log Out</Button>
    ) : (
      <>
        <Link href="/user/register"><Button>Register</Button></Link>
        <Link href="/user/login"><Button>Login</Button></Link>
      </>
    )}
    </nav>
  );
}