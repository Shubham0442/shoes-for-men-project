const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderStatus: {
    type: String,
    enum: ["Placed", "Shipped", "In Transit", "Ariving today", "Delivered"],
    require: true
  },
  Date_order_placed: { type: String, require: true },
  Date_order_delivered: { type: String, require: true },
  orderDetails: { type: Array, require: true },
  userId: { type: String, require: true },
  delivery_address: { type: Object, require: true }
});

const Order = mongoose.model("order", orderSchema);

module.exports = { Order };
