import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  // const addNoteHost = "http//localhost:5000/api/notes/addnote";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //get all Note
  const getNotes = async () => {
    //TODO: Api calls

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //TODO: Api calls

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({ title, description, tag }),
    });
    // const json = response.json(); // parses JSON response into native JavaScript objects
    // console.log(json);

    // const note = {
    //   _id: "659786c9d5b3f7be4634abfb",
    //   user: "657beb1a2b3433902b8bc67b",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2024-01-05T04:34:17.552Z",
    //   __v: 0,
    // };

    // harry's
    const note = await response.json();
    // // concat returns new array, while push method update existing array, that's why using concat method
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);

    console.log("Deleting the note with id", id);
    // TODO: Api calls

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    // JSON.parse: it will creates its deep copy. so that it will update automatically
    let newNotes = JSON.parse(JSON.stringify(notes));
    // logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      // notes[index].title: this is an element(variable) of this function and we have to change in notes array
      //if matches id
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
