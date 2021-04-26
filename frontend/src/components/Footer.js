import React from "react";

function Footer(props) {
  return (
    <div className="list-btn-container">
      <button
        onClick={props.clearCompleted}
        className="mr-2 text-muted clear-complete-btn footer-btn"
      >
        Clear Completed
      </button>
      <button
        className="text-muted border-left pl-2 delete-list-btn footer-btn"
        data-toggle="modal"
        data-target="#deleteListModal"
      >
        Delete List
      </button>
    </div>
  );
}

export default Footer;
