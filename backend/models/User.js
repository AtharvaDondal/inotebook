//here using capital character because of it represent model..

const mongoose = require('mongoose');
const { Schema } = mongoose;



const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        //it is a javascript functio to identify today's date, don't call it now, because it will run when a document is being inserted. 
        default: Date.now
    }
  });

  const user = mongoose.model('user',UserSchema);
  module.exports = user;