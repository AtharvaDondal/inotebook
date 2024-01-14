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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3YmViMWEyYjM0MzM5MDJiOGJjNjdiIn0sImlhdCI6MTcwMzc2MDY0M30.2dVPk-cboxWK7TVuWnJ1k8ceN-tXRHJBPDt9qa38MhQ",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    setNotes(json)
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //TODO: Api calls

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3YmViMWEyYjM0MzM5MDJiOGJjNjdiIn0sImlhdCI6MTcwMzc2MDY0M30.2dVPk-cboxWK7TVuWnJ1k8ceN-tXRHJBPDt9qa38MhQ",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    const note = {
      _id: "659786c9d5b3f7be4634abfb",
      user: "657beb1a2b3433902b8bc67b",
      title: title,
      description: description,
      tag: tag,
      date: "2024-01-05T04:34:17.552Z",
      __v: 0,
    };
    // // concat returns new array, while push method update existing array, that's why using concat method
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = (id) => {
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
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3YmViMWEyYjM0MzM5MDJiOGJjNjdiIn0sImlhdCI6MTcwMzc2MDY0M30.2dVPk-cboxWK7TVuWnJ1k8ceN-tXRHJBPDt9qa38MhQ",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    // logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      //if matches id
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
