import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    })
    props.showAlert("Added successfully","success")
  };
  const onChange = (e) => {
    //setNote({...note}): value in the note object should be available there, that's why using spread operator and which properties is writing after that [], that will be added or override..
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              value={note.tag}
              name="tag"
              onChange={onChange}
            />
          </div>
          
          <button
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
            disabled = {note.title.length<5 || note.description.length<5}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
