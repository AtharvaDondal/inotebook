const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const router = express.Router();

router.get("/",(req,res) =>{

   res.json([])
})

module.exports = router;
