import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => {
  return ({
    note: {
      background: "#fff",
      float: "left",
      borderRadius: "7px",
      boxShadow: "0 2px 5px #ccc",
      padding: "10px",
      minWidth: "240px",
      margin: "16px",
      float: "left",
    },
    button: {
      position: "relative",
      float: "right",
      color: "#f5ba13",
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
    <Grid className={classes.gridNote} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <div className={classes.note}>
        <form onSubmit={submitUpdate}>
          <Typography variant="h6">
            <span name="title" role="textbox" onClick={noteClick} onChange={handleChange} contentEditable>{noteState.title}</span>
          </Typography>
          <Typography variant="body1">
            <textarea name="content" value={noteState.content} className={classes.editContent} onChange={handleChange} onClick={noteClick} />
          </Typography>
          <button type="submit" style={{float: "left"}} className={classes.button} hidden={!noteFocused}>SAVE</button>
          <button className={classes.button} onClick={() => {props.onDelete(props.id)}}><DeleteIcon /></button>
        </form>
      </div>
    </Grid>
  )
}

export default Note;