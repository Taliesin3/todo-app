import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateArea from "./CreateArea";
import Note from "./Note";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexgrow: 1,
  },
  note: {
    padding: theme.spacing(1),
  }
}));

export default function NotePage() {
  const classes = useStyles();
  // Keeps track of all saved notes
  const [notes, setNotes] = useState();
  
  // Load all notes from DB on mount
  useEffect(() => {
    axios.get("http://localhost:5000/notes/")
      .then((res) => {
        const dbNotes = res.data;
        console.log(dbNotes);
        setNotes(dbNotes);
      })
      .catch(err => console.log("Error: " + err));
  }, []);

  // Add new note from the Create Area
  function addNote(newNote) {
    setNotes(prevNotes => {
      return (
        [...prevNotes, newNote]
      )
    })
  }

  // Delete note from the saved notes
  function deleteNote(id) {
    // Delete note from state
    setNotes(prevNotes => {
      return prevNotes.filter(note => note._id !== id);
    });

    // Delete note from database
    axios.delete(`http://localhost:5000/notes/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log("Error: " + err));
  }

  return (
    <Route path="/">
    <CreateArea
          onAdd={addNote}
        />
        <div className={classes.root}>
        <Grid justify="flex-start" container spacing={0}>
        {notes && notes.map((note, index) => { return (
            <Note className={classes.note}
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

  )
}

