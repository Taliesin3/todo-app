import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => {
  return ({
    note: {
      padding: theme.spacing(2),
    },
    button: {
      color: "#f5ba13",
      border: "none",
      width: "36px",
      height: "36px",
      cursor: "pointer",
      outline: "none",
      backgroundColor: "white",
    }
  }
  );
})

function Note(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.note} >
      <Typography variant="h6">{props.title}</Typography>
      <Typography variant="body1">{props.content}</Typography>
      <button className={classes.button} onClick={() => {props.onDelete(props.id)}}><DeleteIcon /></button>
    </Paper>
  )
}

export default Note;