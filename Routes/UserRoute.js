const express = require("express");
let router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const UserController = require('../Controller/UserController')

// Get All the users
router.get("/getAllUsers", UserController.getAllUser);

//User Login
router.post('/signin', UserController.userSignIn)

//User.Signup
router.post("/signup", UserController.userSignUp);

//delete user
router.delete('/:userId', UserController.delete)


module.exports = router;
