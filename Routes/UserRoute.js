const express = require("express");
let router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/getAllUsers", async (req, res) => {
  try {
    const Users = await User.find();
    console.log(Users);
    res.send(Users);
  } catch (err) {
    console.log(err);
  }
});

router.post("/signup", (req, res) => {
  console.log(Object.keys(req.body).length);
  if (Object.keys(req.body).length === 2) {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          res.send("User Exists");
          console.log("user exists");
        } else {
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
              console.log("Password not hashed error occured" + err);
            } else {
              const NewUser = new User({
                email: req.body.email,
                password: hash,
              });
              console.log(NewUser);
              NewUser.save()
                .then((result) => res.send("User created successfully"))
                .catch((err) => console.log("error occured"));
            }
          });
        }
      })
      .catch((err) => {
        console.log("error in finding user");
      });
  } else {
    res.send("Enter all the needed fields to signup");
  }
});
module.exports = router;
