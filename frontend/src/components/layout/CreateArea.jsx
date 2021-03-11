import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { Fab, Grid, Zoom } from '@material-ui/core';
import axios from "axios";

// TODO: implement animation with effect
/*
@keyframes grow {
  from {
    max-height: 0px;
  }
  to {
    max-height: 100px;
  }
}
form textarea {
  animation-name: grow;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-play-state: paused;
}

document.querySelector("textarea").style.animationPlayState = "running";

*/


const useStyles = makeStyles(theme => {
  return (
    {
      createNote: {
        position: "relative",   // Need this to ensure button stays in place
        marginBottom: "16px",   // Need this to ensure enough space for button
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

export default function CreateArea(props) {
  // CreateNote state
  const [newNote, setNewNote] = useState({
    title: "",
    content: ""
  });
  const [focused, setFocused] = useState(false);
  const token = localStorage.getItem("auth-token");
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

  // Send new note to App's addNote function
  async function submitNote(e) {
    e.preventDefault();
    
    try {
      // Submit to database if logged in
      if (token !== "") {
        console.log(token)
        const addedNote = await axios.post(
          '/api/notes/add', 
          newNote,
          {headers: {"x-auth-token": token }}
          );
          props.onAdd(addedNote.data);
          
      // Allow note taking to still work even if not logged in
      // just store notes in memory, not in database   
      } else {
        let d = new Date();
        newNote['_id'] = d.getMilliseconds();
        console.log(newNote)
        props.onAdd(newNote);
      }
        
      // Clear text in create area
      setNewNote({
        title: "",
        content: ""
      });
    } catch(err) {
      console.log(err);
    }
  }

  
  return (
    <Grid item xs={12} sm={8} md={6} lg={4}>
      <form 
        className={classes.createNote} 
        onSubmit={submitNote} 
        onFocus={(e) => {setFocused(true)}} 
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setFocused(false);
          }
        }}
      >
        <input 
          className={classes.createContent}  
          onChange={handleChange} 
          name="title" 
          placeholder="Title" 
          value={newNote.title} 
          autoComplete="off"
        />
        <textarea 
          hidden={!focused} 
          className={classes.createContent} 
          onChange={handleChange} 
          name="content" 
          placeholder="Take a note..." 
          rows="3" 
          value={newNote.content} 
        />
        <Zoom in={focused}>
          <Fab className={classes.button} type="submit" disabled={!(newNote.title || newNote.content)}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </Grid>
  );
}
