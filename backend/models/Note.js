//here using capital character because of it represent model..

const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    //just like foreign key, which user id be here in type, and we are storing rather user storing user id,so that we can store user here, which comming from User.js (mongoose: 30)
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
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

  module.exports = mongoose.model("notes",NotesSchema);