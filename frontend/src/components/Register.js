import React, { useState, useEffect } from "react";
import $ from "jquery";

function Register(props) {
  const [editNote, setEditNote] = useState({
    _id: "",
    title: "",
    content: "",
    date: "",
    priority: "",
  });

  useEffect(() => {
    console.log("useEffect triggered");
    if (props.noteData !== undefined && editNote._id !== props.noteData._id) {
      setEditNote({
        _id: props.noteData._id,
        title: props.noteData.title,
        content: props.noteData.content,
        date: props.noteData.date,
        priority: props.noteData.priority,
      });

      $("#editModal").find(".radio-edit").removeAttr("checked");
      $("#editModal")
        .find(`.radio-edit[value="${props.noteData.priority}"]`)
        .attr("checked", "checked");
    }
  }, [editNote._id, props.noteData]);

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(e);
    setEditNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitUpdate(e) {
    e.preventDefault();
    props.updateNote(editNote);
  }

  // Allow user to press Enter instead of clicking submit button
  function pressEnterSubmit(e) {
    const key = e.charCode || e.keyCode || 0;
    if (key === 13) {
      e.preventDefault();
      document.querySelector("#submit-task-btn-edit").click();
    }
  }

  return (
    <div className="modal fade" id="registerModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* Body & Form */}
          <form
            onSubmit={submitUpdate}
            onKeyPress={(e) => pressEnterSubmit(e)}
            className="register-form"
          >
            <div className="modal-body">
              {/* Username */}
              <div className="form-group">
                <input
                  className="form-control task-field"
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  id="task-title-edit"
                  maxLength="15"
                  value=""
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <input
                  className="form-control task-field"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  id="register-email"
                  value=""
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <input
                  className="form-control task-field"
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="register-password"
                  minLength="8"
                  value=""
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              {/* Footer & buttons */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => {
                    setEditNote({
                      _id: props.noteData._id,
                      title: props.noteData.title,
                      content: props.noteData.content,
                      date: props.noteData.date,
                      priority: props.noteData.priority,
                    });
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success commit-task-btn"
                  id="submit-task-btn-edit"
                  data-toggle="modal"
                  data-target="#editModal"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
