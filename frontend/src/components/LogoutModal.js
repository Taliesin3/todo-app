import React, { useContext } from "react";
import UserContext from "../context/UserContext";

function LogoutModal(props) {
  const { userData, setUserData } = useContext(UserContext);

  function confirmLogout() {
    localStorage.setItem("auth-token", "");
    setUserData({
      id: undefined,
      token: undefined,
      username: undefined,
      isLoggedIn: false,
    });
    props.setNotes({
      0: [],
    });
    props.setLists([
      {
        id: 0,
        title: "Default List",
      },
    ]);
  }

  return (
    <div
      className="modal fade"
      id="logoutModal"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Logout
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Are you sure you want to logout?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              type="button"
              className="btn btn-success confirm-delete-list-btn"
              data-dismiss="modal"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
