import React, { useState } from "react";
import helper from "../helper";
import $ from "jquery";

function SideMenu(props) {
  const [newList, setNewList] = useState({
    id: props.lists.length,
    title: "",
    notes: [],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNewList((prevList) => {
      return {
        ...prevList,
        [name]: value,
      };
    });
  }

  function addNewList(e) {
    e.preventDefault();
    const newId = newList.id + 1;
    props.submitNewList(newList);
    setNewList({
      id: newId,
      title: "",
      notes: [],
    });
  }

  return (
    <div className="side-menu text-capitalize">
      <div
        onClick={helper.openAndCloseSideMenu}
        className="close-btn text-muted"
      >
        <i className="fas fa-times"></i>
      </div>

      {/* Side menu title and lists */}
      <div className="container mt-5 list-container">
        <h4>My Lists</h4>
        <ul className="lists">
          {/* List all of the list titles, with the active list shown in bold */}
          {props.lists.length > 0 &&
            props.lists.map((list, index) => {
              return (
                <li
                  onClick={() => props.setActiveList(index)}
                  key={index}
                  id={`list-${index}`}
                >
                  {index === props.activeList ? (
                    <strong>{list.title}</strong>
                  ) : (
                    <>{list.title}</>
                  )}
                </li>
              );
            })}
        </ul>

        {/* Form to create a new list */}
        <form onSubmit={(e) => addNewList(e)} className="new-list-form">
          <div className="form-group">
            <input
              onChange={handleChange}
              className="new-list-input w-75"
              autoComplete="off"
              type="text"
              placeholder="New list name"
              name="title"
              value={newList.title}
            />
            <button className="new-list-btn text-muted" type="submit">
              <i className="fas fa-plus new-list-btn"></i>
            </button>
          </div>

          {/* Validation */}
          <small className="list-alert text-danger d-none">
            Please enter list name
          </small>
        </form>
      </div>
    </div>
  );
}

export default SideMenu;
