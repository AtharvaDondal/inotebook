import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "6597862c9d5b3f7fbe4634abfdb",
          "user": "657beb1a2b3433902b8bc67b",
          "title": "about daily",
          "description": "wake up early, and do some exercises daily",
          "tag": "personal",
          "date": "2024-01-05T04:34:17.552Z",
          "__v": 0
        },
        {
          "_id": "659786c9d35b3f7be4s634absfb",
          "user": "657beb1a2b3433902b8bc67b",
          "title": "about daily",
          "description": "wake up early, and do some exercises daily",
          "tag": "personal",
          "date": "2024-01-05T04:34:17.552Z",
          "__v": 0
        },
        {
          "_id": "659786c9d54b3f7bhe4634asbfb",
          "user": "657beb1a2b3433902b8bc67b",
          "title": "about daily",
          "description": "wake up early, and do some exercises daily",
          "tag": "personal",
          "date": "2024-01-05T04:34:17.552Z",
          "__v": 0
        },
        {
          "_id": "659786c9d5b35f7be4634abfb",
          "user": "657beb1a2b3433902b8bc67b",
          "title": "about daily",
          "description": "wake up early, and do some exercises daily",
          "tag": "personal",
          "date": "2024-01-05T04:34:17.552Z",
          "__v": 0
        },
        {
          "_id": "659786c9d5b36f7be4634abfb",
          "user": "657beb1a2b3433902b8bc67b",
          "title": "about daily",
          "description": "wake up early, and do some exercises daily",
          "tag": "personal",
          "date": "2024-01-05T04:34:17.552Z",
          "__v": 0
        },
        {
          "_id": "659786c9d5b37f7be4634abfb",
          "user": "657beb1a2b3433902b8bc67b",
          "title": "about daily",
          "description": "wake up early, and do some exercises daily",
          "tag": "personal",
          "date": "2024-01-05T04:34:17.552Z",
          "__v": 0
        },
        {
          "_id": "659786c9d5b3f7be4634abfb",
          "user": "657beb1a2b3433902b8bc67b",
          "title": "about daily",
          "description": "wake up early, and do some exercises daily",
          "tag": "personal",
          "date": "2024-01-05T04:34:17.552Z",
          "__v": 0
        },
      ]
    const [notes, setNotes] = useState(notesInitial)

    //Add a Note
      const addNote = (title,description,tag) => {
        // concat returns new array, while push method update existing array, that's why using concat method

        //TODO: Api calls
        const note =  {
          "_id": "659786c9d5b3f7be4634abfb",
          "user": "657beb1a2b3433902b8bc67b",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2024-01-05T04:34:17.552Z",
          "__v": 0
        }
        setNotes(notes.concat(note))
      }

    //Delete a Note
      const deleteNote = (id) => {

      }

    //Edit a Note
    const editNote = (idf) => {

    }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    
    )
}

export default NoteState;