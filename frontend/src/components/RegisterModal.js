import React, { useState, useEffect } from "react";
import $ from "jquery";

function Register(props) {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(e);
    setRegisterForm((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitUpdate(e) {
    e.preventDefault();
    props.updateNote(registerForm);
  }

  // Allow user to press Enter instead of clicking submit button
  function pressEnterSubmit(e) {
    const key = e.charCode || e.keyCode || 0;
    if (key === 13) {
      e.preventDefault();
      document.querySelector("#submit-register-form").click();
    }
  }

  return (
    <div className="modal fade" id="registerModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">Register</h5>
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
              <p>
                You can use Taski without registering, however your notes will
                be deleted when you close or refresh the page.
              </p>
              <p>
                If you want your notes to be saved for later use, please
                register below.
              </p>
              {/* Username */}
              <div className="form-group">
                <input
                  className="form-control task-field"
                  type="text"
                  name="username"
                  placeholder="Username"
                  id="register-username"
                  maxLength="15"
                  value={registerForm.username}
                  onChange={handleChange}
                  autoComplete="off"
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
                  value={registerForm.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Footer & buttons */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  setRegisterForm({
                    username: "",
                    email: "",
                    password: "",
                  });
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success commit-task-btn"
                id="submit-register-form"
                data-toggle="modal"
                data-target="#registerModal"
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

export default Register;
