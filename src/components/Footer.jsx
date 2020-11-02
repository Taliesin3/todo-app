import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => {
  return (
    {
      footer: {
        position: "absolute",
        textAlign: "center",
        bottom: 0,
        width: "100%",
        height: "2.5rem",
        color: "#ccc",
      },
    }
  )
})

const date = new Date();
const year = date.getFullYear();

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body1">Copyright &#169; {year}</Typography>
    </footer>
  )
}

export default Footer;