const handleError = require("../utils/handleError");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return handleError(
        "Authentication failed: Token not provided.",
        401,
        next
      );
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, "jwt_secret_key");

    req.userData = { username: decodedToken.username };

    next();
  } catch (err) {
    return handleError("Authentication failed: Invalid token.", 401, next);
  }
};
