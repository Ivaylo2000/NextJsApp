const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  username: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
module.exports = mongoose.model("Product", productSchema);
