import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "659786c9d5b3f7be4634abfb",
          "user": "657beb1a2b3433902b8bc67b",
          "title": "about daily routine",
          "description": "wake up early, and do some exercises daily",
          "tag": "personal",
          "date": "2024-01-05T04:34:17.552Z",
          "__v": 0
        }
      ]
    const [notes, setNotes] = useState(notesInitial)
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    
    )
}

export default NoteState;