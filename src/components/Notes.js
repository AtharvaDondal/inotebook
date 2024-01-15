import React, { useContext, useEffect,useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";


const Notes = () => {
  
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes(notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({etitle:currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  };  

  const ref = useRef(null)
  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
   etag: "default",
  });

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Updating the note", note)

  };
  const onChange = (e) => {
    //setNote({...note}): value in the note object should be available there, that's why using spread operator and which properties is writing after that [], that will be added or override..
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref = {ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
       
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

            <form className="my-3">
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.etitle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              onChange={onChange}
              value={note.edescription}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              onChange={onChange}
              value={note.etag}
            />
          </div>
          
        </form>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick = {handleClick}type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your notes</h1>
        {notes.map((note) => {
          return (
            <Noteitem note={note} key={note._id} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
