import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import CreateArea from "../layout/CreateArea";
import Note from "../layout/Note";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexgrow: 1,
  },
  note: {
    padding: theme.spacing(0),
  }
}));

export default function NotePage() {
  const classes = useStyles();
  // Keeps track of all saved notes
  const [notes, setNotes] = useState();
  const token = localStorage.getItem("auth-token");

  // Load all notes from DB on mount + when notes/token update
  useEffect(() => {
    // Using an IIFE to carry out an async func within useEffect
    (async function getNotes() {
      try {
        const dbNotes = await axios.get(
          "http://localhost:5000/notes/", 
          {headers: {"x-auth-token": token }}
        );
        setNotes(dbNotes.data);
      } catch(err) {
        console.log("Error: " + err);
      }
    })();
  }, [notes, token]);

  // Add new note from the Create Area
  // TODO: remove this redundant function
  function addNote(newNote) {
    setNotes(prevNotes => {
      return (
        [...prevNotes, newNote]
      )
    })
  }

  // Delete note from the saved notes
  async function deleteNote(id) {
    try {
      // Delete note from database
      const deletedNote = await axios.delete(
        `http://localhost:5000/notes/${id}`, 
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
    <Route path="/notes">
    <div className={classes.root}>
      <Grid container spacing={2}>
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
      </Grid>
      </div>
    </Route>

  )
}

