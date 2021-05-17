import React, { useEffect, useState } from "react";
import $ from "jquery";

function EditTaskForm(props) {
  const [editModal, setEditModal] = useState({
    noteId: "",
    title: "",
    content: "",
    deadline: "",
    priority: "",
    completed: false,
  });

  useEffect(() => {
    if (
      props.noteData !== undefined &&
      editModal.noteId !== props.noteData.noteId
    ) {
      setEditModal({
        noteId: props.noteData.noteId,
        title: props.noteData.title,
        content: props.noteData.content,
        deadline: props.noteData.deadline,
        priority: props.noteData.priority,
        completed: props.noteData.completed,
      });

      $("#editModal").find(".radio-edit").removeAttr("checked");
      $("#editModal")
        .find(`.radio-edit[value="${props.noteData.priority}"]`)
        .attr("checked", "checked");
    }
  }, [editModal.noteId, props.noteData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setEditModal((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitUpdate(e) {
    e.preventDefault();
    props.updateNote(editModal);
  }

  // Allow user to press Enter instead of clicking submit button
  function pressEnterSubmit(e) {
    // const key = e.charCode || e.keyCode || 0;
    // if (key === 13) {
    //   e.preventDefault();
    //   document.querySelector("#submit-task-btn-edit").click();
    // }
  }

  return (
    <div className="modal fade" id="editModal">
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
            className="edit-task-form"
          >
            <div className="modal-body">
              {/* Title */}
              <div className="form-group">
                <input
                  className="form-control task-field"
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  id="task-title-edit"
                  value={editModal.title}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div className="invalid-feedback">
                  Please complete all fields
                </div>
              </div>

              {/* Notes */}
              <div className="form-group form-notes">
                <textarea
                  className="form-control form-notes task-field"
                  name="content"
                  id="task-notes-edit"
                  cols="30"
                  rows="3"
                  placeholder="Notes"
                  value={editModal.content}
                  onChange={handleChange}
                ></textarea>
                <div className="invalid-feedback">
                  Please complete all fields
                </div>
              </div>

              {/* Deadline */}
              <div className="form-group">
                <label htmlFor="task-deadline-edit" className="deadline-label">
                  Deadline Date
                </label>
                <input
                  className="form-control task-field"
                  type="date"
                  name="deadline"
                  id="task-deadline-edit"
                  value={editModal.deadline}
                  onChange={handleChange}
                />
              </div>

              {/* Priority */}
              <div className="from-group form-radio">
                <label className="priority-label">Choose priority level:</label>

                <div className="form-check">
                  <input
                    className="form-check-input radio-edit"
                    type="radio"
                    name="priority"
                    id="high-priority-edit"
                    value="1"
                    onChange={handleChange}
                  />
                  <label
                    className="ml-2 form-check-label border-red"
                    htmlFor="high-priority-edit"
                  >
                    High Priority
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input radio-edit"
                    type="radio"
                    name="priority"
                    id="mid-priority-edit"
                    value="2"
                    onChange={handleChange}
                  />
                  <label
                    className="ml-2 form-check-label border-yellow"
                    htmlFor="mid-priority-edit"
                  >
                    Mid Priority
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input radio-edit"
                    type="radio"
                    name="priority"
                    id="low-priority-edit"
                    value="3"
                    onChange={handleChange}
                  />
                  <label
                    className="ml-2 form-check-label border-green"
                    htmlFor="low-priority-edit"
                  >
                    Low Priority
                  </label>
                </div>
              </div>
            </div>

            {/* Footer & buttons */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  setEditModal({
                    noteId: props.noteData.noteId,
                    title: props.noteData.title,
                    content: props.noteData.content,
                    deadline: props.noteData.deadline,
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTaskForm;
