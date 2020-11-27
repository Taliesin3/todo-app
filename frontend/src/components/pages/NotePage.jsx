import React, { useState, useEffect, useContext } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import CreateArea from "../layout/CreateArea";
import Note from "../layout/Note";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import UserContext from "../../context/UserContext";

const useStyles = makeStyles(theme => ({
  root: {
    flexgrow: 1,
  },
  note: {
    padding: theme.spacing(2),
  }
}));

export default function NotePage() {
  const { userData } = useContext(UserContext);
  // Keeps track of all saved notes
  const [notes, setNotes] = useState();
  const token = localStorage.getItem("auth-token");
  const classes = useStyles();
  
  // Load all notes from DB on mount + when notes/token update
  useEffect(() => {
    let isUnmounted = false;
    
    // Using an IIFE to carry out an async func within useEffect
    (async function getNotes() {
      try {
        const dbNotes = await axios.get(
          "/api/notes/", 
          {headers: {"x-auth-token": token }}
        );
        if (!isUnmounted) {
          setNotes(dbNotes.data.reverse());
        }
      } catch(err) {
        console.log("Error: " + err);
      }
    })();
    
    return () => {isUnmounted = true}
  }, [token]);

  // Add new note from the Create Area
  function addNote(newNote) {
    setNotes(prevNotes => {
      return (
        [newNote, ...prevNotes]
      )
    })
  }

  // Delete note from the saved notes
  async function deleteNote(id) {
    try {
      // Delete note from database
      const deletedNote = await axios.delete(
        `/api/notes/${id}`, 
        {headers: {"x-auth-token": token}}
      );
      console.log(deletedNote.data);
    } catch(err) { 
      console.log("Error: " + err);
    }

    // Delete note from state
    setNotes(prevNotes => {
      return prevNotes.filter(note => note._id !== id);
    });
  }

  return (
    <div>
    <Route path="/notes">
      <div className={classes.root}>
        <Grid container justify="center" spacing={2}>
            <CreateArea
              onAdd={addNote}
            />
        </Grid>
        <Grid container spacing={2}>
          {notes && notes.map((note) => { return (
            <Note 
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              onDelete={deleteNote}
            />
          )})}
          </Grid>
          </div>
    
    </Route>
      </div>
  )
}

