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

export default function App() {
  // user state, passed to context below
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    isLoggedIn: false,
  });

  // TODO: separate notes into own state, just use id to link lists to notes?
  const [lists, setLists] = useState([
    {
      id: 0,
      title: "Default List",
      notes: [],
    },
  ]);
  const [activeList, setActiveList] = useState(0);
  const [editNote, setEditNote] = useState(null);
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
              user: userRes.data,
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

  function addList(newList) {
    setLists((prevLists) => {
      return [...prevLists, newList];
    });
    console.log(lists);
  }

  function addNote(newNote) {
    newNote._id = lists[activeList].notes.length;
    setLists((prevLists) => {
      let newLists = Array.from(prevLists);
      newLists[activeList] = {
        ...prevLists[activeList],
        notes: [...prevLists[activeList].notes, newNote],
      };
      return newLists;
    });

    console.log(lists);
  }

  function updateNote(updatedNote) {
    const id = updatedNote._id;
    setLists((prevLists) => {
      let newLists = Array.from(prevLists);
      newLists[activeList].notes[id] = updatedNote;
      return newLists;
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
    setLists((prevLists) => {
      let newLists = Array.from(prevLists);
      newLists[activeList] = {
        ...prevLists[activeList],
        notes: prevLists[activeList].notes.filter(
          (note) => note._id !== noteId
        ),
      };
      return newLists;
    });
  }

  function setComplete(taskId, completed) {
    setLists((prevLists) => {
      let newLists = Array.from(prevLists);
      newLists[activeList] = {
        ...prevLists[activeList],
        notes: prevLists[activeList].notes.map((note) => {
          if (note._id === taskId) note.completed = !completed;
          return note;
        }),
      };
      return newLists;
    });
  }

  function clearCompleted() {
    setLists((prevLists) => {
      console.log(prevLists);
      let newLists = Array.from(prevLists);
      newLists[activeList] = {
        ...prevLists[activeList],
        notes: prevLists[activeList].notes.filter(
          (note) => note.completed === false
        ),
      };
      return newLists;
    });
  }

  function editListName(newName) {
    setLists((prevLists) => {
      let newLists = Array.from(prevLists);
      newLists[activeList] = {
        ...prevLists[activeList],
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
            notes: [],
          },
        ];
      });

      // Delete current list, and set active list to the first list
    } else {
      setLists((prevLists) => {
        return prevLists.filter((list) => list.id !== activeList);
      });
    }
    setActiveList(0);
  }

  function sortNotes(e) {
    const sortType = e.target.value;
    console.log(sortType);

    if (sortType === "priority") {
      setLists((prevLists) => {
        let newLists = Array.from(prevLists);
        newLists[activeList].notes = prevLists[activeList].notes.sort(
          (a, b) => parseInt(a.priority) - parseInt(b.priority)
        );
        return newLists;
      });
    } else if (sortType === "deadline") {
      setLists((prevLists) => {
        let newLists = Array.from(prevLists);
        newLists[activeList].notes = prevLists[activeList].notes.sort(
          (a, b) => {
            return Date.parse(a.date) - Date.parse(b.date);
          }
        );
        return newLists;
      });
    } else if (sortType === "title") {
      setLists((prevLists) => {
        let newLists = Array.from(prevLists);
        newLists[activeList].notes = prevLists[activeList].notes.sort(
          (a, b) => {
            const aTitle = a.title.toUpperCase();
            const bTitle = b.title.toUpperCase();

            if (aTitle > bTitle) return 1;
            else if (bTitle > aTitle) return -1;
            else return 0;
          }
        );
        return newLists;
      });
    } else if (sortType === "created") {
      setLists((prevLists) => {
        let newLists = Array.from(prevLists);
        newLists[activeList].notes = prevLists[activeList].notes.sort(
          (a, b) => a.created - b.created
        );
        return newLists;
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
            listTitle={lists[activeList].title}
            activeList={activeList}
            sortNotes={sortNotes}
          />
        </header>
        <Main
          lists={lists}
          activeList={activeList}
          notes={lists[activeList].notes}
          addNote={addNote}
          deleteNote={deleteNote}
          setComplete={setComplete}
          setEditNote={setEditNote}
        />
        <SideMenu
          lists={lists}
          submitNewList={addList}
          activeList={activeList}
          setActiveList={setActiveList}
        />
        <NewTaskForm onAdd={addNote} />
        <EditTaskForm
          noteData={lists[activeList].notes[editNote]}
          updateNote={updateNote}
        />
        <DeleteListModal deleteList={deleteList} />
        <EditListNameModal
          editListName={editListName}
          activeList={activeList}
          listName={lists[activeList].title}
        />
        <RegisterModal />
        <LoginModal />
        <Footer clearCompleted={clearCompleted} />
      </UserContext.Provider>
    </div>
  );
}
