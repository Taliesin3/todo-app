import React, { useState, useEffect, useContext } from "react";
import $ from "jquery";
import Axios from "axios";
import UserContext from "../context/UserContext";

function Register(props) {
  const { userData, setUserData } = useContext(UserContext);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    passwordCheck: "",
  });
  const { defaultList } = props;

  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterForm((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  async function submitRegister(e) {
    e.preventDefault();
    const form = e.target;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      try {
        // Register user in database
        await Axios.post("api/user/register", registerForm);

        // Log user in
        const loginRes = await Axios.post("api/user/login", {
          username: registerForm.username,
          password: registerForm.password,
        });

        // Set tup the default list for new user
        Axios.post(
          "api/lists/add",
          {
            userId: loginRes.data.user.id,
            listId: defaultList.listId,
            title: defaultList.title,
          },
          {
            headers: { "x-auth-token": loginRes.data.token },
          }
        );

        // Update user state
        setUserData({
          token: loginRes.data.token,
          username: loginRes.data.user.username,
          id: loginRes.data.user.id,
          isLoggedIn: true,
        });

        // Reset form values
        setRegisterForm({
          username: "",
          password: "",
          passwordCheck: "",
        });

        // Set token
        localStorage.setItem("auth-token", loginRes.data.token);
      } catch (err) {
        console.log(err);
      }
    }

    form.classList.add("was-validated");
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
            onSubmit={submitRegister}
            onKeyPress={pressEnterSubmit}
            className="register-form needs-validation"
            noValidate
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
                  placeholder="Password (8 characters minimum)"
                  id="register-password"
                  minLength="8"
                  value={registerForm.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div className="invalid-feedback">
                  Password must be at least 8 characters long.
                </div>
              </div>

              {/* Password Check */}
              <div className="form-group">
                <input
                  className="form-control task-field"
                  type="password"
                  name="passwordCheck"
                  placeholder="Please re-enter password"
                  id="password-check"
                  minLength="8"
                  value={registerForm.passwordCheck}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="invalid-feedback">Passwords must match.</div>
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
                disabled={
                  registerForm.username.length > 0 &&
                  registerForm.password.length > 7 &&
                  registerForm.passwordCheck.length > 7
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

export default Register;
