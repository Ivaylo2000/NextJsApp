const HttpError = require("../models/http-error");

function handleError(message, errorCode, next) {
  const error = new HttpError(message, errorCode);
  next(error);
}

module.exports = handleError;
