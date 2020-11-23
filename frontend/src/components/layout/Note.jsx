import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { InputBase } from "@material-ui/core/";

const useStyles = makeStyles(theme => {
  return ({
    note: {
      padding: theme.spacing(1),
    },
    deleteButton: {
      color: theme.palette.secondary.main,  // previously "#f5ba13",
      border: "none",
      width: "36px",
      height: "36px",
      cursor: "pointer",
      outline: "none",
      backgroundColor: "white",
    },
    saveButton: {
      color: theme.palette.secondary.main,  // previously "#f5ba13",
      border: "none",
      height: "36px",
      cursor: "pointer",
      outline: "none",
      backgroundColor: "white",
    },
    editTitle: {
        border: "none",
        outline: "none",
        fontSize: "1.3em",
        fontFamily: "inherit",
        resize: "none",
        fontWeight: "bold",
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

  // Update note
  function submitUpdate(e) {
    e.preventDefault();
    setNoteFocused(false);
  }
  
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Paper className={classes.note} >
        <form onSubmit={submitUpdate} noValidate autoComplete="off">
          <InputBase 
            id="title" 
            name="title" 
            fullWidth 
            className={classes.editTitle} 
            value={noteState.title} 
            onChange={handleChange} 
            onFocus={() => setNoteFocused(true)}
            onBlur={() => {setNoteFocused(false)}}   
          />
          <InputBase 
            id="content" 
            name="content" 
            multiline 
            fullWidth 
            value={noteState.content} 
            className={classes.editContent} 
            onChange={handleChange} 
            onFocus={() => setNoteFocused(true)}
            onBlur={() => {setNoteFocused(false)}}
          />
          <Grid container>
            <Grid container item justify="flex-start" xs={6}>
              <button type="submit" className={classes.saveButton} hidden={!noteFocused}>SAVE</button>
            </Grid>
            <Grid container item justify="flex-end" xs={6}>
              <button className={classes.deleteButton} onClick={() => {props.onDelete(props.id)}}><DeleteIcon /></button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      </Grid>
    </React.Fragment>
  )
}

export default Note;