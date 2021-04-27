import React, { useState, useEffect } from "react";
import $ from "jquery";

function Login(props) {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(e);
    setLoginForm((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitUpdate(e) {
    e.preventDefault();
    props.updateNote(loginForm);
  }

  // Allow user to press Enter instead of clicking submit button
  function pressEnterSubmit(e) {
    const key = e.charCode || e.keyCode || 0;
    if (key === 13) {
      e.preventDefault();
      document.querySelector("#submit-login-form").click();
    }
  }

  return (
    <div className="modal fade" id="loginModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
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
            className="login-form"
          >
            <div className="modal-body">
              {/* Username */}
              <div className="form-group">
                <input
                  className="form-control task-field"
                  type="text"
                  name="username"
                  placeholder="Username"
                  id="login-username"
                  maxLength="15"
                  value={loginForm.username}
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
                  id="login-password"
                  minLength="8"
                  value={loginForm.password}
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
                  setLoginForm({
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
                id="submit-login-form"
                data-toggle="modal"
                data-target="#loginModal"
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

export default Login;
