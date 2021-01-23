const express = require("express");
let router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const UserController = require('../Controller/UserController')
const checkAuth = require('../middleware/checkauth')

// Get All the users
router.get("/getAllUsers", checkAuth, UserController.getAllUser);

//User Login
router.post('/signin', UserController.userSignIn)

//User.Signup
router.post("/signup", UserController.userSignUp);

//delete user
router.delete('/:userId', checkAuth, UserController.delete)


module.exports = router;
