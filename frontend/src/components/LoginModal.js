import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../context/UserContext";

function LoginModal(props) {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { userData, setUserData } = useContext(UserContext);
  const { lists, setLists, setNotes, activeListIndex, setActiveListIndex } =
    props;

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginForm((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  // Login form submit function
  async function submitLogin(e) {
    e.preventDefault();

    try {
      const loginRes = await axios.post("/api/user/login", loginForm);
      localStorage.setItem("auth-token", loginRes.data.token);

      setUserData({
        id: loginRes.data.user.id,
        token: loginRes.data.token,
        username: loginRes.data.user.username,
        isLoggedIn: true,
      });

      // Set the current active list to whichever list is first
      setActiveListIndex(0);

      // Get lists from database and updated state
      const dbLists = await axios.get("/api/lists/", {
        headers: { "x-auth-token": loginRes.data.token },
      });
      setLists(dbLists.data);

      // For each list, get their notes from the database and update state
      for (let list of dbLists.data) {
        // Get notes for the specific list currently being viewed
        const dbNotes = await axios.get(`/api/notes/${list.listId}`, {
          headers: { "x-auth-token": loginRes.data.token },
        });

        setNotes((prevNotes) => {
          return {
            ...prevNotes,
            [list.listId]: dbNotes.data,
          };
        });
      }

      // Reset login form
      setLoginForm({
        username: "",
        password: "",
      });

      console.log("Login Successful!");
    } catch (err) {
      console.log(err);
    }
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
            onSubmit={submitLogin}
            onKeyPress={pressEnterSubmit}
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
                disabled={
                  loginForm.username.length > 0 && loginForm.password.length > 0
                    ? false
                    : true
                }
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

export default LoginModal;
