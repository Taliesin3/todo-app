import React, { useState, useContext, useEffect } from "react";
import helper from "../helper";
import $ from "jquery";
import UserContext from "../context/UserContext";
import axios from "axios";

function SideMenu(props) {
  const { userData, setUserData } = useContext(UserContext);
  const [newList, setNewList] = useState({
    title: "",
  });
  const token = localStorage.getItem("auth-token");
  const { lists, setLists, setActiveListIndex, setNotes } = props;

  // Load all notes from DB on mount + when notes/token update
  useEffect(() => {
    let isUnmounted = false;
    // Using an IIFE to carry out an async func within useEffect

    if (userData.isLoggedIn === true) {
      (async function getLists() {
        try {
          const dbLists = await axios.get("/api/lists/", {
            headers: { "x-auth-token": token },
          });
          if (isUnmounted === false) {
            setLists(dbLists.data);
            for (let list of dbLists.data) {
              setNotes((prevNotes) => {
                return {
                  ...prevNotes,
                  [list.listId]: [],
                };
              });
            }
          }
        } catch (err) {
          console.log("Error: " + err);
        }
      })();
    }

    return () => {
      isUnmounted = true;
    };
  }, [token, setLists, setNotes, userData]);

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
    newList["listId"] = Date.now();
    props.submitNewList(newList);
    setNewList({
      title: "",
    });
  }

  return (
    <div className="side-menu text-capitalize">
      <div
        onClick={helper.openAndCloseSideMenu}
        className="close-btn text-muted"
        id="sidemenu-header"
      >
        <div id="sidemenu-buttons">
          {userData.isLoggedIn === true ? (
            <button
              id="sidemenu-logout"
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
                id="sidemenu-register"
                data-toggle="modal"
                data-target="#registerModal"
              >
                register
              </button>
              <button
                id="sidemenu-login"
                className="text-muted account-buttons"
                data-toggle="modal"
                data-target="#loginModal"
              >
                login
              </button>
            </>
          )}
        </div>
        <i className="fas fa-times"></i>
      </div>

      {/* Side menu title and lists */}
      <div className="container mt-5 list-container">
        <h4>My Lists</h4>
        <ul className="lists">
          {/* List all of the list titles, with the active list shown in bold */}
          {lists.length > 0 &&
            lists.map((list, index) => {
              return (
                <li
                  onClick={() => setActiveListIndex(index)}
                  key={list.listId}
                  id={`list-${list.listId}`}
                >
                  {list.listId === props.activeListIndex ? (
                    <strong>{list.title}</strong>
                  ) : (
                    <>{list.title}</>
                  )}
                </li>
              );
            })}
        </ul>

        {/* Form to create a new list */}
        <form onSubmit={addNewList} className="new-list-form">
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
      <a
        id="icons-credit"
        className="text-muted"
        href="https://icons8.com/icon/WC5A99NaaqzR/list-is-empty"
      >
        Icons by Icons8
      </a>
    </div>
  );
}

export default SideMenu;
