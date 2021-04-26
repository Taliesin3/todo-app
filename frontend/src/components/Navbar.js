import React from 'react'
import helper from '../helper'

function Navbar() {
  
  return (
    <nav className="navbar py-3">
        <p className="brand text-muted m-0">taski  
          <i className="fas fa-bullseye red px-1"></i>
          <i className="fas fa-bullseye yellow px-1"></i>
          <i className="fas fa-bullseye green px-1"></i>
        </p>
        <button onClick={helper.openAndCloseSideMenu} className="navbar-toggler menu-toggle text-muted" type="button">
          <i className="fas fa-bars slide-btn" data-slide-button></i>
        </button>
      </nav>
  )
}

export default Navbar
