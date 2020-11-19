import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
  
  // Load all notes from DB on mount
  useEffect(() => {
    axios.get("http://localhost:5000/notes/", 
      {headers: {"x-auth-token": token }})
      .then((res) => {
        const dbNotes = res.data;
        setNotes(dbNotes);
      })
      .catch(err => console.log("Error: " + err));
  }, [notes]);

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
    axios.delete(`http://localhost:5000/notes/${id}`, 
      {headers: {"x-auth-token": token}})
      .then(res => console.log(res.data))
      .catch(err => console.log("Error: " + err));
  }

  return (
    <Route path="/notes">
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid container item xs={12} justify="center" spacing={0}>
            <CreateArea
              onAdd={addNote}
            />
        </Grid>
      <Grid container item xs={12} justify="flex-start" spacing={2}>
        {notes && notes.map((note) => { return (
            <Grid item key={note._id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Note 
                key={note._id}
                id={note._id}
                title={note.title}
                content={note.content}
                onDelete={deleteNote}
              />
            </Grid>
        )})}
        </Grid>
      </Grid>
      </div>
    </Route>

  )
}

