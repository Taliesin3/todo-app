import React, { useEffect } from "react";
import $ from "jquery";

function TaskCard(props) {
  // Convert numeric priority to class name
  const priorityClass = {
    1: "high-priority",
    2: "mid-priority",
    3: "low-priority",
    4: "",
  };

  let deadline = null;
  if (!(props.deadline === null || props.deadline === "")) {
    deadline = new Date(props.deadline);
  }

  return (
    <div
      data-id={props.id}
      id={props.id}
      className={`task-card card ${
        props.priority && priorityClass[props.priority]
      } ${props.completed ? "completed" : ""}`}
    >
      {/* Header - Title & Date */}
      <div className="task-card-header text-center mt-3">{props.title}</div>
      <button
        onClick={() => props.setEditNoteId(props.index)}
        className="editBtn"
        data-noteid={props.id}
      >
        <i
          className="fas fa-edit text-muted"
          data-toggle="modal"
          data-target="#editModal"
          aria-hidden="true"
        ></i>
      </button>
      <p className="date-deadline text-muted text-center">
        {deadline !== null && `Due by ${deadline.toDateString()}`}
      </p>

      {/* Content */}
      <div className="card-body text-muted pt-0 task-notes">
        {props.content}
      </div>
      <div className="task-card-footer mb-1">
        <div className="complete-label">mark as complete:</div>
        <div className="task-card-btns-container">
          <label className="checkbox-container">
            <input
              onClick={() => props.setComplete(props.id, props.completed)}
              className="checkbox checkmark"
              type="checkbox"
              checked={props.completed ? true : false}
            />
            <span className="checkmark"></span>
          </label>
          <i
            onClick={() => props.onDelete(props.id)}
            className="fas fa-trash-alt text-muted"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
