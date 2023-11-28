//here using capital character because of it represent model..

const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "General",
    },
    date:{
        type: Date,
        //it is a javascript functio to identify today's date, don't call it now, because it will run when a document is being inserted. 
        default: Date.now
    }
  });

  module.exports = mongoose.modela("notes",NotesSchema);