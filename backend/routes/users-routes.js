const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/users-controller");
const validateUser = require("../middleware/validateUser");

router.post("/login", login);
router.post("/signup", validateUser, signup);

module.exports = router;
