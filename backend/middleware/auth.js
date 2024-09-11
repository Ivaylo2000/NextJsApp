const handleError = require("../utils/handleError");
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decotedToken = jwt.verify(token, "jwt_secret_key");
    req.userData = { username: decotedToken.username };
    next();
  } catch (err) {
    return handleError("Server error", 500, next);
  }
};
