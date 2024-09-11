const { check } = require("express-validator");

const validateUser = [
  check("username").notEmpty().isEmpty(),

  check("email").normalizeEmail().isEmail(),

  check("password").notEmpty().isLength({ min: 6 }),
];

module.exports = validateUser;
