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

  const [lists, setLists] = useState([
    {
      id: 0,
      title: "Default List",
    },
  ]);
  const [notes, setNotes] = useState({
    0: [],
  });
  const [activeListId, setActiveListId] = useState(0);
  const [editNoteId, setEditNoteId] = useState(null);
  let token = localStorage.getItem("auth-token");

  // Check if user is logged in
  useEffect(() => {
    // useEffect cannot be asynchronous, so we must define our
    // async function here and then call it at the end of our effect
    const checkLoggedIn = async () => {
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
    };

    checkLoggedIn();

    // Cleanup local storage on unmount
    return () => {
      localStorage.removeItem("auth-token");
    };
  }, []);

  function submitNewList(newList) {
    setLists((prevLists) => {
      return [...prevLists, newList];
    });
    setNotes((prevNotes) => {
      return {
        ...prevNotes,
        [newList.id]: [],
      };
    });
  }

  function addNote(newNote) {
    newNote._id = notes[activeListId].length;
    newNote["listId"] = activeListId;

    // Submit note to database if logged in
    if (userData.isLoggedIn === true) {
      newNote["userId"] = userData.id;

      try {
        const addedNote = axios.post("api/notes/add", newNote, {
          headers: { "x-auth-token": token },
        });
      } catch (err) {
        console.log(err);
      }
    }

    setNotes((prevNotes) => {
      return {
        ...prevNotes,
        [activeListId]: [...prevNotes[activeListId], newNote],
      };
    });
  }

  function updateNote(updatedNote) {
    const id = updatedNote._id;
    setNotes((prevNotes) => {
      let newNotes = Array.from(prevNotes[activeListId]);
      newNotes[id] = updatedNote;
      return {
        ...prevNotes,
        [activeListId]: newNotes,
      };
    });
  }

  async function deleteNote(noteId) {
    // Delete from backend if logged in
    if (token !== "") {
      try {
        await axios.delete(`/api/notes/${noteId}`, {
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
        [activeListId]: prevNotes[activeListId].filter(
          (note) => note._id !== noteId
        ),
      };
    });
  }

  function setComplete(taskId, completed) {
    setNotes((prevNotes) => {
      return {
        ...prevNotes,
        [activeListId]: prevNotes[activeListId].map((note) => {
          if (note._id === taskId) note.completed = !completed;
          return note;
        }),
      };
    });
  }

  function clearCompleted() {
    setNotes((prevNotes) => {
      return {
        ...prevNotes,
        [activeListId]: prevNotes[activeListId].filter(
          (note) => note.completed === false
        ),
      };
    });
  }

  function editListName(newName) {
    setLists((prevLists) => {
      let newLists = Array.from(prevLists);
      newLists[activeListId] = {
        ...prevLists[activeListId],
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
        return prevLists.filter((list) => list.id !== activeListId);
      });
    }
    setActiveListId(0);
  }

  function sortNotes(e) {
    const sortType = e.target.value;

    if (sortType === "priority") {
      setNotes((prevNotes) => {
        return {
          ...prevNotes,
          [activeListId]: prevNotes[activeListId].sort(
            (a, b) => parseInt(a.priority) - parseInt(b.priority)
          ),
        };
      });
    } else if (sortType === "deadline") {
      setNotes((prevNotes) => {
        let newNotes = prevNotes[activeListId].sort((a, b) => {
          return a.deadline - b.deadline;
        });
        return {
          ...prevNotes,
          [activeListId]: newNotes,
        };
      });
    } else if (sortType === "title") {
      setNotes((prevNotes) => {
        return {
          ...prevNotes,
          [activeListId]: prevNotes[activeListId].sort((a, b) => {
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
          [activeListId]: prevNotes[activeListId].sort(
            (a, b) => a.created - b.created
          ),
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
            listTitle={lists[activeListId].title}
            activeListId={activeListId}
            sortNotes={sortNotes}
          />
        </header>
        <Main
          lists={lists}
          activeListId={activeListId}
          notes={notes[activeListId]}
          setNotes={setNotes}
          addNote={addNote}
          deleteNote={deleteNote}
          setComplete={setComplete}
          setEditNoteId={setEditNoteId}
        />
        <SideMenu
          lists={lists}
          submitNewList={submitNewList}
          activeListId={activeListId}
          setActiveListId={setActiveListId}
        />
        <NewTaskForm onAdd={addNote} />
        <EditTaskForm
          noteData={notes[activeListId][editNoteId]}
          updateNote={updateNote}
        />
        <DeleteListModal deleteList={deleteList} />
        <EditListNameModal
          editListName={editListName}
          activeListId={activeListId}
          listName={lists[activeListId].title}
        />
        <RegisterModal />
        <LoginModal />
        <LogoutModal setNotes={setNotes} setLists={setLists} />
        <Footer clearCompleted={clearCompleted} />
      </UserContext.Provider>
    </div>
  );
}
