const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all Notes using : GET "/api/notes/fetchallnotes",login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(sucess,error);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new note using : POST "/api/notes/addnote",login required.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atlest 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      //here we are doing destructuring
      const { title, description, tag } = req.body;
      //if there are errors return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3:update an existing note using: PUT "/api/notes/updatenotes",login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
   try {
      
  const { title, description, tag } = req.body;
  // create a newNote object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // find the note to be updated and update it.
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  //new: true: if new contact is came, created basically. and $set: it sets existing note to updated one.
  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json(note);
}  catch (error) {
   console.error(error);
   res.status(500).send("Internal Server Error");
 }
});

// ROUTE 4:delete an existing note using: DELETE "/api/notes/deletenote",login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
   try {
        
  // find the note to be deleted and delete it.
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  //allow deletion if only user owns this note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  //new: true: if new contact is came, created basically. and $set: it sets existing note to updated one.
 note = await Note.findByIdAndDelete(req.params.id)
 res.json({"sucess":"Note has been deleted",note:note})
} catch (error) {
   console.error(error);
   res.status(500).send("Internal Server Error");
 } 
});

module.exports = router;
