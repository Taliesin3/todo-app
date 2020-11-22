import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => {
  return (
    {
      footer: {
        position: "sticky",
        bottom: 0,
        color: "#ccc",
        height: "2.5rem",
      },
    }
  )
})

const date = new Date();
const year = date.getFullYear();

function Footer() {
  const classes = useStyles();

  return (
    <Grid container item xs={12} justify="center">
      <footer className={classes.footer}>
        <Typography variant="body1">Copyright &#169; {year}</Typography>
      </footer>
    </Grid>
  )
}

export default Footer;