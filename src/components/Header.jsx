import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Button, Grid, Paper, Toolbar, Typography } from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles(theme => {
  return (
    {
      root: {
        flexGrow: 1,
      },
      header: {
        backgroundColor: "primary",
        padding: theme.spacing(2),
        color: "#fff",
        marginBottom: "16px",
      },
      title: {
        fontFamily: "'McLaren', cursive",
        fontWeight: 200,
        flexGrow: 1,
      },
      headerLink: {
        textDecoration: "none",
        color: "inherit",
      },
    }
  )
})

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" square className={classes.header}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            <Link className={classes.headerLink} to="/">
              Keeper
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link className={classes.headerLink} to="/user">
              <Button color="inherit">Account</Button>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;