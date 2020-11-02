import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => {
  return ({
    gridNote: {
      
    },
    note: {
      background: "#fff",
      float: "left",
      borderRadius: "7px",
      boxShadow: "0 2px 5px #ccc",
      padding: "10px",
      width: "240px",
      margin: "16px",
      float: "left",
    },
    button: {
      position: "relative",
      float: "right",
      marginRight: "10px",
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
    <Grid className={classes.gridNote} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <div className={classes.note}>
        <Typography variant="h6">{props.title}</Typography>
        <Typography variant="body1">{props.content}</Typography>
        <button className={classes.button} onClick={() => {props.onDelete(props.id)}}><DeleteIcon /></button>
      </div>
    </Grid>
  )
}

export default Note;