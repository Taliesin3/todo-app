import React, { useContext } from "react";
import {useHistory} from "react-router-dom";
import { Link } from "@material-ui/core";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../../context/UserContext";

const useStyles = makeStyles(theme => {
  return ({
    headerButton: {
      color: "#fff",
      fontFamily: "'McLaren', cursive",
    },
  });
})

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
      isLoggedIn: false,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  }

  return (
    <nav>
    {userData.isLoggedIn ? (
      <Button onClick={logout}>
        <Typography className={classes.headerButton} variant="h6">Log Out</Typography>
      </Button>
    ) : (
      <div>
        
        <Link href="/user/register">
          <Button>
            <Typography className={classes.headerButton} variant="h6">Register</Typography>
          </Button>
        </Link>
        <Link href="/user/login">
          <Button>
            <Typography className={classes.headerButton} variant="h6">Login</Typography>
          </Button>
        </Link>
        
      </div>
    )}
    </nav>
  );
}