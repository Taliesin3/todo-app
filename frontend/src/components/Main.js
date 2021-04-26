import React, { useState } from "react";

import $ from "jquery";
import TaskCard from "./TaskCard";

function Main(props) {
  const token = localStorage.getItem("auth-token");

  const toggleSearchBox = () => {
    $(".search-box").toggleClass("focus-border");
  };

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
          // TODO: Implement search functionality - remove display: none style
        }

        <div style={{ display: "none" }} className="search-box border-muted">
          <input
            onFocus={toggleSearchBox}
            onBlur={toggleSearchBox}
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

        {/* CONTAINER FOR CURRENT LISTS */}
        <div className="current-list-container">
          {/* Display notes if they exist, else display empty notes message */}
          {props.notes.length > 0 ? (
            props.notes.map((note) => {
              return (
                <TaskCard
                  key={note._id}
                  id={note._id}
                  title={note.title}
                  content={note.content}
                  date={note.date}
                  priority={note.priority}
                  onDelete={props.deleteNote}
                  completed={note.completed}
                  setComplete={props.setComplete}
                  setEditNote={props.setEditNote}
                />
              );
            })
          ) : (
            <div
              className="empty-message-container"
              data-empty-message-container
            >
              <img
                src="https://img.icons8.com/ios/100/000000/empty-box.png"
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
