const { Router } = require("express");
const { Cart } = require("../Models/cart.model");
const { authentication } = require("../Middlewares/authenticate");
require("dotenv").config();

const cartController = Router();

cartController.get("/get", authentication, async (req, res) => {
  const { userId } = req.body;

  const userCart = await Cart.find({ userIdCart: userId });

  res.status(201).send({ cart: userCart });
});

cartController.post("/add", authentication, async (req, res) => {
  const { userId } = req.body;

  const userCart = new Cart({ userIdCart: userId, ...req.body });

  await userCart.save();

  res.status(201).send({ msg: "item added to cart" });
});

cartController.patch("/update/:id", authentication, async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const updatedCartItem = await Cart.findByIdAndUpdate(
    { _id: id, userCartId: userId },
    { $inc: { Qty: req?.body.Qty } }
  );

  res.status(201).send({ msg: "cart item updated" });
});

cartController.delete("/remove/:id", authentication, async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const deletedCartItem = await Cart.findByIdAndDelete({
    _id: id,
    userCartId: userId
  });

  res.status(201).send({ msg: "cart item deleted" });
});

cartController.delete("/empty", authentication, async (req, res) => {
  const { userId } = req.body;

  const removedItems = await Cart.deleteMany({ userIdCart: userId });

  res.status(201).send({ msg: "cart items deleted" });
});

module.exports = { cartController };
