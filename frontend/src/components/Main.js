import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import $ from "jquery";
import TaskCard from "./TaskCard";
import UserContext from "../context/UserContext";

function Main(props) {
  const { userData } = useContext(UserContext);
  const token = localStorage.getItem("auth-token");
  const {
    lists,
    setLists,
    setNotes,
    activeListIndex,
    setActiveListIndex,
  } = props;

  // Load all notes from DB on mount + when notes/token update
  useEffect(() => {
    let isUnmounted = false;

    // Using an IIFE to carry out an async func within useEffect
    if (userData.isLoggedIn === true) {
      (async function getNotes() {
        try {
          // Get notes for the specific list currently being viewed
          const dbNotes = await axios.get(
            `/api/notes/${lists[activeListIndex].listId}`,
            {
              headers: { "x-auth-token": token },
            }
          );
          // Set the notes state for the current list
          if (isUnmounted === false) {
            setNotes((prevNotes) => {
              return {
                ...prevNotes,
                [lists[activeListIndex].listId]: dbNotes.data,
              };
            });
          }
        } catch (err) {
          console.log("Error: " + err);
        }
      })();
    }

    return () => {
      isUnmounted = true;
    };
  }, [token, lists, setNotes, activeListIndex, userData]);

  return (
    <>
      <div className="current-list-container-wrapper">
        {/* MAIN SECTION */}
        {/* wrapper for current list container */}
        {/* plus button to add new task */}
        <button
          className="new-task-btn"
          data-toggle="modal"
          data-target="#modal"
        >
          <i className="fas fa-plus text-muted" />
        </button>

        {
          /* search button to search tasks */
          // TODO: Implement search functionality
          /*
        <div className="search-box border-muted">
          <input
            onFocus={() => $(".search-box").toggleClass("focus-border")}
            onBlur={() => $(".search-box").toggleClass("focus-border")}
            className="search-txt"
            type="text"
            placeholder="Type to Search"
          />
          <button className="search-btn">
            <i
              onClick={() => document.querySelector(".search-txt").focus()}
              className="fas fa-search text-muted"
            />
          </button>
        </div>
        
        */
        }

        {/* CONTAINER FOR CURRENT LISTS */}
        <div className="current-list-container">
          {/* Display notes if they exist, else display empty notes message */}
          {props.notes.length > 0 ? (
            props.notes.map((note, index) => {
              return (
                <TaskCard
                  key={note._id}
                  id={note._id}
                  index={index}
                  title={note.title}
                  content={note.content}
                  deadline={note.deadline}
                  priority={note.priority}
                  onDelete={props.deleteNote}
                  completed={note.completed}
                  setComplete={props.setComplete}
                  setEditNoteId={props.setEditNoteId}
                />
              );
            })
          ) : (
            <div
              className="empty-message-container"
              data-empty-message-container
            >
              <img
                src="https://img.icons8.com/cotton/100/000000/empty-box.png"
                alt="Empty box icon"
              />
              <p data-message-paragraph>
                No tasks created.
                <br /> To get started, click the{" "}
                <i className="fas fa-plus text-muted" /> icon above.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
