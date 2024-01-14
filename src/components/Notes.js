import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes,getNotes} = context;

  useEffect(() => {
    getNotes(notes)
  }, [])
  
  return (
    <>
    <AddNote />
    <div className="row my-3">
      <h1>Your notes</h1>
      {notes.map((note) => {
        return <Noteitem note = {note} key = {note._id}/>
      })}
    </div>
      </>
  );
};

export default Notes;
