import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { Fab, Grid, Paper, Zoom } from '@material-ui/core';
import axios from "axios";

const useStyles = makeStyles(theme => {
  return (
    {
      createNote: {
        position: "relative",   // Need this to ensure button stays in place
        marginBottom: "16px",
        background: "#fff",
        padding: theme.spacing(2),
        borderRadius: "7px",
        boxShadow: "0 1px 5px rgb(138, 137, 137)",
      },
      createContent: {
        width: "100%",    // TODO: probably best to remove this, change to grid item
        border: "none",
        padding: theme.spacing(1),
        outline: "none",
        fontSize: "1.2em",
        fontFamily: "inherit",
        resize: "none",
      },
      button: {
        position: "absolute",
        right: "18px",
        bottom: "-18px",
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "36px",
        height: "36px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        outline: "none",
      },
    }
  )
})

function CreateArea(props) {
  // CreateNote state
  const [newNote, setNewNote] = useState({
    title: "",
    content: ""
  });
  const [noteFocused, setNoteFocused] = useState(false);
  const classes = useStyles();
  
  // Capture state when typing new note
  function handleChange(e) {
    const {name, value} = e.target;
    
    setNewNote(prevNote => {
      return {
        ...prevNote,
        [name] : value
      }
    });
  }

  // Respond to clicking on the create note area
  function noteClick(e) {
    const element = e.target;
    setNoteFocused(true);
    document.querySelector("textarea").style.animationPlayState = "running";
  }

  // Send new note to App's addNote function
  function submitNote(e) {
    e.preventDefault();
    
    props.onAdd(newNote);
    
    axios.post('http://localhost:5000/notes/add', newNote)
      .then(res => console.log(res.data))
      .catch(err => console.log("Error: " + err));
    
    setNewNote({
      title: "",
      content: ""
    });
  }
  
  return (
    <Grid item xs={12} sm={4}>
      <form className={classes.createNote} onSubmit={submitNote}>
        <input onClick={noteClick} className={classes.createContent}  onChange={handleChange} name="title" placeholder="Title" value={newNote.title} autoComplete="off"/>
        <textarea hidden={!noteFocused} className={classes.createContent} onChange={handleChange} name="content" placeholder="Take a note..." rows="3" value={newNote.content} />
        <Zoom in={noteFocused}>
          <Fab className={classes.button} type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </Grid>
  );
}

export default CreateArea;