const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  Qty: { type: Number, required: true },
  cover: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  userIdCart: { type: String, required: true }
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = { Cart };
