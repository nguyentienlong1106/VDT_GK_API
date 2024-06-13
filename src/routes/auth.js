const express = require("express");
const { register, login } = require("../controllers/auth.js");
const studentsController = require("../controllers/Students.Controller");
const router = express.Router();

router.post("/login", login);

router.post("/register", register);

module.exports = router;
