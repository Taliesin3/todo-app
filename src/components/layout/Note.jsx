import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => {
  return ({
    note: {
      padding: theme.spacing(1),
    },
    button: {
      color: theme.palette.secondary.main,  // previously "#f5ba13",
      border: "none",
      width: "36px",
      height: "36px",
      cursor: "pointer",
      outline: "none",
      backgroundColor: "white",
    },
    editTitle: {
        border: "none",
        outline: "none",
        fontSize: "1em",
        fontFamily: "inherit",
        resize: "none",
    },
    editContent: {
      border: "none",
      outline: "none",
      fontSize: "1em",
      fontFamily: "inherit",
      resize: "none",
    },
  }
  );
})

function Note(props) {
  // Set state for this note
  const [noteState, setNoteState] = useState({
    title: props.title,
    content: props.content
  });
  const [noteFocused, setNoteFocused] = useState(false);
  const classes = useStyles();

  // Capture state when typing new note
  function handleChange(e) {
    const {name, value} = e.target;
    
    setNoteState(prevNote => {
      return {
        ...prevNote,
        [name] : value
      }
    });
  }

  // Respond to clicking on the note area
  function noteClick(e) {
    setNoteFocused(true);
  }

  // Update note
  function submitUpdate(e) {
    e.preventDefault();
    console.log("Update button clicked")
    setNoteFocused(false);
  }
  
  return (
    <React.Fragment>
      <Paper className={classes.note} >
        <Typography variant="h6">{props.title}</Typography>
        <Typography variant="body1">{props.content}</Typography>
        <button className={classes.button} onClick={() => {props.onDelete(props.id)}}><DeleteIcon /></button>
      </Paper>
    </React.Fragment>
  )
}

export default Note;