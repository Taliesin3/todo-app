import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import SideMenu from "./components/SideMenu";
import NewTaskForm from "./components/NewTaskForm";
import EditTaskForm from "./components/EditTaskForm";
import DeleteListModal from "./components/DeleteListModal";
import EditListNameModal from "./components/EditListNameModal";
import Footer from "./components/Footer";
import Overlay from "./components/Overlay";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal.js";

import UserContext from "./context/UserContext";
import LogoutModal from "./components/LogoutModal";

export default function App() {
  // user state, passed to context below
  const [userData, setUserData] = useState({
    id: undefined,
    token: undefined,
    username: undefined,
    isLoggedIn: false,
  });

  const DEFAULT_LIST = {
    listId: 0,
    title: "Default List",
  };

  const [lists, setLists] = useState([DEFAULT_LIST]);
  const [notes, setNotes] = useState({
    0: [],
  });
  const [activeListIndex, setActiveListIndex] = useState(0);
  const [editNoteId, setEditNoteId] = useState(null);
  let token = localStorage.getItem("auth-token");

  // Check if user is logged in
  useEffect(() => {
    // useEffect cannot be asynchronous, so we must define our
    // async function here and then call it at the end of our effect
    async function checkLoggedIn() {
      try {
        let token = localStorage.getItem("auth-token");

        // error thrown if token does not exist, so we must set
        // an empty token
        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        } else {
          // check if token is valid
          const tokenRes = await axios.post("/api/user/isTokenValid", null, {
            headers: { "x-auth-token": token },
          });
          console.log(
            `Token check is: ${tokenRes.data}, user is ${
              tokenRes.data === false ? "not " : ""
            }logged in`
          );

          // if a user is logged in, get user data
          if (tokenRes.data) {
            const userRes = await axios.get("/api/user/", {
              headers: { "x-auth-token": token },
            });

            // set state as logged in user data, which is passed to context
            setUserData({
              token,
              username: userRes.data.username,
              id: userRes.data.id,
              isLoggedIn: true,
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    checkLoggedIn();
  }, []);

  function submitNewList(newList) {
    // Update frontend lists/notes
    setLists((prevLists) => {
      return [...prevLists, newList];
    });
    setNotes((prevNotes) => {
      return {
        ...prevNotes,
        [newList.listId]: [],
      };
    });

    // Update database if logged in
    if (userData.isLoggedIn === true) {
      try {
        axios.post(
          "api/lists/add",
          {
            userId: userData.id,
            listId: newList.listId,
            title: newList.title,
          },
          {
            headers: { "x-auth-token": token },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  function addNote(newNote) {
    newNote["listId"] = lists[activeListIndex].listId;

    // Submit note to database if logged in
    if (userData.isLoggedIn === true) {
      newNote["userId"] = userData.id;

      try {
        axios.post("api/notes/add", newNote, {
          headers: { "x-auth-token": token },
        });
      } catch (err) {
        console.log(err);
      }
    }

    // Add note to frontend state
    setNotes((prevNotes) => {
      return {
        ...prevNotes,
        [lists[activeListIndex].listId]: [
          ...prevNotes[lists[activeListIndex].listId],
          newNote,
        ],
      };
    });
  }

  function updateNote(updatedNote) {
    // Update backend if logged in
    if (userData.isLoggedIn === true) {
      try {
        axios.post(`/api/notes/update/${updatedNote._id}`, updatedNote, {
          headers: { "x-auth-token": token },
        });
      } catch (err) {
        console.log(err);
      }
    }

    // Update frontend
    setNotes((prevNotes) => {
      let newNotes = Array.from(prevNotes[lists[activeListIndex].listId]);
      newNotes[editNoteId] = updatedNote;
      return {
        ...prevNotes,
        [lists[activeListIndex].listId]: newNotes,
      };
    });
  }

  function deleteNote(noteId) {
    // Delete from backend if logged in
    if (userData.isLoggedIn === true) {
      try {
        axios.delete(`/api/notes/${noteId}`, {
          headers: { "x-auth-token": token },
        });
      } catch (err) {
        console.log(err);
      }
    }

    // Delete from frontend
    setNotes((prevNotes) => {
      return {
        ...prevNotes,
        [lists[activeListIndex].listId]: prevNotes[
          lists[activeListIndex].listId
        ].filter((note) => note._id !== noteId),
      };
    });
  }

  function setComplete(taskId, completed) {
    // Update backend if logged in
    if (userData.isLoggedIn === true) {
      try {
        axios.post(
          `/api/notes/update/${taskId}`,
          { completed: !completed },
          {
            headers: { "x-auth-token": token },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    // Update frontend
    setNotes((prevNotes) => {
      return {
        ...prevNotes,
        [lists[activeListIndex].listId]: prevNotes[
          lists[activeListIndex].listId
        ].map((note) => {
          if (note._id === taskId) note.completed = !completed;
          return note;
        }),
      };
    });
  }

  function clearCompleted() {
    // Delete completed notes from current list from databse
    if (userData.isLoggedIn === true) {
      try {
        for (let note of notes[lists[activeListIndex].listId]) {
          if (note.completed === true) {
            axios.delete(`/api/notes/${note._id}`, {
              headers: { "x-auth-token": token },
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    // Remove completed notes from frontend
    setNotes((prevNotes) => {
      return {
        ...prevNotes,
        [lists[activeListIndex].listId]: prevNotes[
          lists[activeListIndex].listId
        ].filter((note) => note.completed === false),
      };
    });
  }

  function editListName(newName) {
    setLists((prevLists) => {
      let newLists = Array.from(prevLists);
      newLists[activeListIndex] = {
        ...prevLists[activeListIndex],
        title: newName,
      };
      return newLists;
    });
  }

  function deleteList() {
    // If deleting the only list, just reset to a default list
    if (lists.length === 1) {
      setLists((prevLists) => {
        return [
          {
            id: 0,
            title: "Default List",
          },
        ];
      });

      // Delete current list, and set active list to the first list
    } else {
      setLists((prevLists) => {
        return prevLists.filter(
          (list) => list.listId !== lists[activeListIndex].listId
        );
      });
    }

    // Delete list and related notes from database
    if (userData.isLoggedIn === true) {
      try {
        axios.delete(`/api/lists/${lists[activeListIndex].listId}`, {
          headers: { "x-auth-token": token },
        });
      } catch (err) {
        console.log(err);
      }
    }

    setActiveListIndex(0);
  }

  function sortNotes(e) {
    const sortType = e.target.value;

    if (sortType === "priority") {
      setNotes((prevNotes) => {
        return {
          ...prevNotes,
          [lists[activeListIndex].listId]: prevNotes[
            lists[activeListIndex].listId
          ].sort((a, b) => parseInt(a.priority) - parseInt(b.priority)),
        };
      });
    } else if (sortType === "deadline") {
      setNotes((prevNotes) => {
        let newNotes = prevNotes[lists[activeListIndex].listId].sort((a, b) => {
          if (isNaN(Date.parse(a.deadline))) return 1;
          else if (isNaN(Date.parse(b.deadline))) return -1;
          else if (Date.parse(a.deadline) > Date.parse(b.deadline)) return 1;
          else if (Date.parse(b.deadline) > Date.parse(a.deadline)) return -1;
          else return 0;
        });
        console.log(newNotes);
        return {
          ...prevNotes,
          [lists[activeListIndex].listId]: newNotes,
        };
      });
    } else if (sortType === "title") {
      setNotes((prevNotes) => {
        return {
          ...prevNotes,
          [lists[activeListIndex].listId]: prevNotes[
            lists[activeListIndex].listId
          ].sort((a, b) => {
            const aTitle = a.title.toUpperCase();
            const bTitle = b.title.toUpperCase();

            if (aTitle > bTitle) return 1;
            else if (bTitle > aTitle) return -1;
            else return 0;
          }),
        };
      });
    } else if (sortType === "created") {
      setNotes((prevNotes) => {
        return {
          ...prevNotes,
          [lists[activeListIndex].listId]: prevNotes[
            lists[activeListIndex].listId
          ].sort((a, b) => Date.parse(a.created) - Date.parse(b.created)),
        };
      });
    }
  }

  return (
    <div id="main">
      <UserContext.Provider value={{ userData, setUserData }}>
        <Overlay />
        <header>
          <Navbar />
          <SubNavbar
            listTitle={lists[activeListIndex].title}
            activeListIndex={activeListIndex}
            sortNotes={sortNotes}
          />
        </header>
        <Main
          lists={lists}
          activeListIndex={activeListIndex}
          notes={notes[lists[activeListIndex].listId]}
          setNotes={setNotes}
          addNote={addNote}
          deleteNote={deleteNote}
          setComplete={setComplete}
          setEditNoteId={setEditNoteId}
        />
        <SideMenu
          lists={lists}
          setLists={setLists}
          notes={notes}
          setNotes={setNotes}
          submitNewList={submitNewList}
          activeListIndex={activeListIndex}
          setActiveListIndex={setActiveListIndex}
        />
        <NewTaskForm onAdd={addNote} />
        <EditTaskForm
          noteData={notes[lists[activeListIndex].listId][editNoteId]}
          updateNote={updateNote}
        />
        <DeleteListModal deleteList={deleteList} />
        <EditListNameModal
          editListName={editListName}
          activeListIndex={activeListIndex}
          listName={lists[activeListIndex].title}
        />
        <RegisterModal defaultList={DEFAULT_LIST} />
        <LoginModal
          lists={lists}
          setLists={setLists}
          setNotes={setNotes}
          activeListIndex={activeListIndex}
          setActiveListIndex={setActiveListIndex}
        />
        <LogoutModal
          setNotes={setNotes}
          setLists={setLists}
          setActiveListIndex={setActiveListIndex}
        />
        <Footer clearCompleted={clearCompleted} />
      </UserContext.Provider>
    </div>
  );
}
