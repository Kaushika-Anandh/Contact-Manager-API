const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser); //to register the user

router.post("/login", loginUser); //for user login

router.get("/current",validateToken, currentUser); //for current user info

module.exports = router;