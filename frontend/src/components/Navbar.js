import React from "react";
import helper from "../helper";

function Navbar() {
  return (
    <nav className="navbar py-3">
      <p className="brand text-muted m-0">
        taski
        <i className="fas fa-bullseye red px-1"></i>
        <i className="fas fa-bullseye yellow px-1"></i>
        <i className="fas fa-bullseye green px-1"></i>
      </p>
      <div id="navbar-buttons">
        <button
          className="text-muted"
          id="navbar-register"
          data-toggle="modal"
          data-target="#registerModal"
        >
          register
        </button>
        <button
          id="navbar-login"
          className="text-muted"
          data-toggle="modal"
          data-target="#loginModal"
        >
          login
        </button>
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
