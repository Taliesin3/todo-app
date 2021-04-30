import React from "react";

function SubNavbar(props) {
  return (
    <div id="subnavbar" className="py-2">
      <div className="d-flex">
        <p className="list-name text-capitalize lead p-0 m-0">
          {props.listTitle}
        </p>
        <i
          className="fas fa-pencil-alt edit-list-name-btn align-self-center ml-2"
          data-toggle="modal"
          data-target="#editListNameModal"
        ></i>
      </div>

      <div className="d-flex" id="sort-container">
        <label className="m-0 py-0 px-2" htmlFor="sort">
          Sort by:
        </label>
        <select
          onChange={(e) => props.sortNotes(e)}
          name="sort"
          id="sort"
          className="sort-dropdown"
        >
          <option value="created">Date Created</option>
          <option value="priority">Priority</option>
          <option value="deadline">Deadline</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
}

export default SubNavbar;
