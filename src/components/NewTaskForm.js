import React, { useState, useContext } from "react";
import $ from "jquery";
import UserContext from "../context/UserContext";
import Axios from "axios";

function NewTaskForm(props) {
  const { userData } = useContext(UserContext);

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    deadline: "",
    created: "",
    priority: "4",
    completed: false,
  });
  const token = localStorage.getItem("auth-token");

  // Update state with any changes to form
  function handleChange(e) {
    const { name, value } = e.target;
    setNewNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  // Submit task form and create new task
  async function submitTask(e) {
    e.preventDefault();

    // Set created time
    newNote.created = Date.now();
    if (newNote.deadline !== "") {
      newNote.deadline = Date.parse(newNote.deadline);
    }

    // Add to frontend
    props.onAdd(newNote);

    // Reset text in new task form
    setNewNote({
      title: "",
      content: "",
      deadline: "",
      created: "",
      priority: "4",
      completed: false,
    });
  }

  // Allow user to press Enter instead of clicking submit button
  function pressEnterSubmit(e) {
    // const key = e.charCode || e.keyCode || 0;
    // if (key === 13) {
    //   e.preventDefault();
    //   document.querySelector("#submit-task-btn").click();
    // }
  }

  function clearForm() {
    setTimeout(
      () =>
        setNewNote({
          title: "",
          content: "",
          deadline: "",
          created: "",
          priority: "4",
          completed: false,
        }),
      1000
    );
  }

  return (
    <div className="modal fade" id="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">New Task</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span onClick={clearForm} aria-hidden="true">
                &times;
              </span>
            </button>
          </div>

          <form
            onSubmit={submitTask}
            onKeyPress={(e) => pressEnterSubmit(e)}
            className="new-task-form"
          >
            <div className="modal-body">
              {/* Title field */}
              <div className="form-group">
                <input
                  onChange={handleChange}
                  value={newNote.title}
                  className="form-control task-field"
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  id="task-title"
                  autoComplete="off"
                />
                <div className="invalid-feedback">
                  Please complete all fields
                </div>
              </div>

              {/* Content field */}
              <div className="form-group form-notes">
                <textarea
                  onChange={handleChange}
                  value={newNote.content}
                  className="form-control task-field"
                  name="content"
                  id="task-notes"
                  cols="30"
                  rows="3"
                  placeholder="Notes"
                />
                <div className="invalid-feedback">
                  Please complete all fields
                </div>
              </div>

              {/* Deadline field */}
              <div className="form-group">
                <label htmlFor="task-deadline" className="deadline-label">
                  Deadline Date
                  <input
                    onChange={handleChange}
                    className="form-control task-field"
                    type="date"
                    name="deadline"
                    id="task-deadline"
                    value={newNote.deadline}
                  />
                </label>
                <div className="invalid-feedback">
                  Please complete all fields
                </div>
              </div>

              {/* Priority Field */}
              <div className="from-group form-radio">
                <label className="priority-label">Choose priority level:</label>

                <div className="form-check">
                  <input
                    onChange={handleChange}
                    className="form-check-input radio"
                    type="radio"
                    name="priority"
                    id="high-priority"
                    value="1"
                    checked={newNote.priority === "1"}
                  />
                  <label
                    className="ml-2 form-check-label border-red"
                    htmlFor="high-priority"
                  >
                    High Priority
                  </label>
                </div>

                <div className="form-check">
                  <input
                    onChange={handleChange}
                    className="form-check-input radio"
                    type="radio"
                    name="priority"
                    id="mid-priority"
                    value="2"
                    checked={newNote.priority === "2"}
                  />
                  <label
                    className="ml-2 form-check-label border-yellow"
                    htmlFor="mid-priority"
                  >
                    Mid Priority
                  </label>
                </div>

                <div className="form-check">
                  <input
                    onChange={handleChange}
                    className="form-check-input radio"
                    type="radio"
                    name="priority"
                    id="low-priority"
                    value="3"
                    checked={newNote.priority === "3"}
                  />
                  <label
                    className="ml-2 form-check-label border-green"
                    htmlFor="low-priority"
                  >
                    Low Priority
                  </label>
                </div>
              </div>

              {/* Submit/Cancel buttons */}
            </div>
            <div className="modal-footer">
              <button
                onClick={clearForm}
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                data-toggle="modal"
                data-target="#modal"
                className="btn btn-success commit-task-btn"
                id="submit-task-btn"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewTaskForm;
