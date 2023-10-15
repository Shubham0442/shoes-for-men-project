const { Router } = require("express");
const { Cart } = require("../Models/cart.model");
const { authentication } = require("../Middlewares/authenticate");
require("dotenv").config();

const cartController = Router();

cartController.get("/get", authentication, async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  const userCart = await Cart.find({ userIdCart: userId });
  //   console.log(userCart);

  res.status(201).send({ cart: userCart });
});

cartController.post("/add", authentication, async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  const userCart = new Cart({ userIdCart: userId, ...req.body });
  await userCart.save();

  res.status(201).send({ msg: "item added to cart" });
});

cartController.patch("/update/:id", authentication, async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const updatedCartItem = await Cart.findByIdAndUpdate(
    { _id: id, userCartId: userId },
    { ...req.body }
  );

  res.status(201).send({ msg: "cart item updated" });
});

cartController.patch("/delete/:id", authentication, async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const deletedCartItem = await Cart.findByIdAndDelete(
    { _id: id, userCartId: userId },
    { ...req.body }
  );

  res.status(201).send({ msg: "cart item deleted" });
});

module.exports = { cartController };
