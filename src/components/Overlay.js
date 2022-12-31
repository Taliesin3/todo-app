import React from 'react'
import helper from '../helper'

function Overlay() {
  /* overlay for when side menu is out */
  
  return (
    <div onClick={helper.openAndCloseSideMenu} className="overlay"></div>
  )
}

export default Overlay
