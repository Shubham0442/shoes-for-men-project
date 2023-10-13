const mongoose = require("mongoose");

const shoeSchema = mongoose.Schema({
  Rate: { type: String, required: true },
  Qty: { type: Number, required: true },
  rating: { type: Number, required: true },
  cover: { type: String, required: true },
  images: { type: Array, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  details: { type: Object, required: true },
  userId: { type: String, required: true }
});

const Shoe = mongoose.model("shoe", shoeSchema);

module.exports = { Shoe };
