const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String }, // URL or path to the user image
});

const User = mongoose.model("User", userSchema);

module.exports = User;
