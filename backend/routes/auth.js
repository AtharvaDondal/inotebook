const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require('bcryptjs');

// create a user using: POST "/api/auth/createuser". doesen't require auth, no login required

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must have a minimum of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there are errors return Bad request and the errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with this email exists already
    // we have to wait till it resolved,that's why using await
    try {
      //writing await because it return us an promise
      let user = await User.findOne({ email: req.body.email });
      console.log(user)
      if (user) {
        res
          .status(400)
          .json({ error: "sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10)
      secPass = await bcrypt.hash(req.body.password,salt) 
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //here using async await so not need to use .then and catch         
      // .then(user => res.json(user))
      res.json(user);
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        return res.status(400).json({ error: "Email already exists" });
      }
      console.error(error);
      res.status(500).json({ error: "Some error occured" });
    }
  }
);

module.exports = router;
