import React from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import helper from "../helper";

function Navbar() {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <nav className="navbar py-3">
      <p className="brand text-muted m-0">
        taski
        <i className="fas fa-bullseye red px-1"></i>
        <i className="fas fa-bullseye yellow px-1"></i>
        <i className="fas fa-bullseye green px-1"></i>
      </p>
      <div id="navbar-buttons">
        {userData.isLoggedIn === true ? (
          <button
            id="navbar-logout"
            className="text-muted account-buttons"
            data-toggle="modal"
            data-target="#logoutModal"
          >
            logout
          </button>
        ) : (
          <>
            <button
              className="text-muted account-buttons"
              id="navbar-register"
              data-toggle="modal"
              data-target="#registerModal"
            >
              register
            </button>
            <button
              id="navbar-login"
              className="text-muted account-buttons"
              data-toggle="modal"
              data-target="#loginModal"
            >
              login
            </button>
          </>
        )}

        <button
          onClick={helper.openAndCloseSideMenu}
          className="navbar-toggler menu-toggle text-muted"
          type="button"
        >
          <i className="fas fa-bars slide-btn" data-slide-button></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
