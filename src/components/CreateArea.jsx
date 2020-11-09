import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { Fab, Grid, Paper, Zoom } from '@material-ui/core';
import axios from "axios";

const useStyles = makeStyles(theme => {
  return (
    {
      createNote: {
        position: "relative",
        margin: "30px auto 20px auto",
        background: "#fff",
        padding: theme.spacing(2),
        borderRadius: "7px",
        boxShadow: "0 1px 5px rgb(138, 137, 137)",
      },
      createContent: {
        width: "100%",
        border: "none",
        padding: "4px",
        outline: "none",
        fontSize: "1.2em",
        fontFamily: "inherit",
        resize: "none",
      },
      button: {
        position: "absolute",
        right: "18px",
        bottom: "-18px",
        background: "#f5ba13",
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
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [noteFocused, setNoteFocused] = useState(false);
  const classes = useStyles();
  
  // Capture state when typing new note
  function handleChange(e) {
    const {name, value} = e.target;
    
    setNote(prevNote => {
      return {
        ...prevNote,
        [name] : value
      }
    });
  }

  // Respond to clicking on the create note area
  function noteClick(e) {
    const element = e.target;
    console.log(element);
    setNoteFocused(true);
    document.querySelector("textarea").style.animationPlayState = "running";
  }

  // Send new note to App's addNote function
  function submitNote(e) {
    e.preventDefault();
    console.log("submiteNote function triggered")

    props.onAdd(note);
    console.log(note);
    
    axios.post('http://localhost:5000/notes/add', note)
      .then(res => console.log(res.data))
      .catch(err => console.log("Error: " + err));
    
    setNote({
      title: "",
      content: ""
    });
  }
  
  return (
    <Grid item xs={12} lg={4}>
      <form className={classes.createNote} onSubmit={submitNote}>
        <input onClick={noteClick} className={classes.createContent}  onChange={handleChange} name="title" placeholder="Title" value={note.title} autoComplete="off"/>
        <textarea hidden={!noteFocused} className={classes.createContent} onChange={handleChange} name="content" placeholder="Take a note..." rows="3" value={note.content} />
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