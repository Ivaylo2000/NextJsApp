const { check } = require("express-validator");

const validateUser = [
  check("username").notEmpty().isEmpty(),

  check("email").normalizeEmail().isEmail(),
];

module.exports = validateUser;
