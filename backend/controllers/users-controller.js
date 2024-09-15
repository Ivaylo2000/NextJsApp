const User = require("../models/user");
const handleError = require("../utils/handleError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return handleError("Login failed! Error finding user.", 500, next);
  }

  if (!existingUser) {
    return handleError("Invalid credentials.", 401, next);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return handleError("Could not log you in.", 401, next);
  }

  if (!isValidPassword) {
    return handleError("Could not log you in.", 401, next);
  }

  let token;
  try {
    token = jwt.sign({ username: existingUser.username }, "jwt_secret_key", {
      expiresIn: "1h",
    });
  } catch (err) {
    return handleError("Logging in failed", 500, next);
  }

  res.json({
    message: "Login successful!",
    userId: existingUser._id,
    token,
    username: existingUser.username,
  });
};

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json({ errorMessage: "User with this email already exists." });
    }

    existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return handleError("Username is taken", 422, next);
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      return handleError("Could not create user, please try again.", 500, next);
    }

    const createdUser = new User({ username, email, password: hashedPassword });
    await createdUser.save();
  } catch (err) {
    return handleError("Signup failed, please try again later.", 500, next);
  }

  res.json({
    message: "Creating account successful!",
  });
};

module.exports = {
  login,
  signup,
};
