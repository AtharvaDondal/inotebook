const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Atharvaisagoodb$oy";

// ROUTE 1: create a user using: POST "/api/auth/createuser". doesen't require auth, no login required
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
    let sucess = false;
    const errors = validationResult(req);
    //if there are errors return Bad request and the errors
    if (!errors.isEmpty()) {
      return res.status(400).json({sucess,errors: errors.array() });
    }

    //check whether the user with this email exists already
    // we have to wait till it resolved,that's why using await
    try {
      //writing await because it return us an promise
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res
          .status(400)
          .json({sucess,error: "sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      sucess = true
      res.json({sucess,authToken});
      //here using async await so not need to use .then and catch
      // .then(user => res.json(user))
      // res.json(user);
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

// ROUTE 2: authenticate a user: POST "/api/auth/login". doesen't require auth, no login required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let sucess = false;
    const errors = validationResult(req);
    //if there are errors return Bad request and the errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        sucess = false;
        return res
          .status(400)
          .json({
            sucess,
            errors: "Please try to login with correct credentials",
          });
      }
      //comparing password, it internally matches all hashes, we don't have to do anything manually
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        sucess = false;
        return res
          .status(400)
          .json({
            sucess,
            errors: "Please try to login with correct credentials",
          });
      }
      // sending user data, and sending only Id
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      sucess = true;
      res.json({ sucess, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get loggedin user details using : POST "/api/auth/getuser",login required.
router.post(
  "/getuser",
  fetchuser,

  async (req, res) => {
    try {
      userId = req.user.id;
      // here we can select all the fields except password, ie, -password
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
