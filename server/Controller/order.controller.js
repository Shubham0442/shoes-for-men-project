const { Router } = require("express");
const { Order } = require("../Models/order.model");
const { authentication } = require("../Middlewares/authenticate");
const { autorization } = require("../Middlewares/autorization");

const orderController = Router();

orderController.get("/", authentication, async (req, res) => {
  const { userId } = req.body;

  const allOrders = await Order.find({ userId });

  console.log(allOrders);

  res.status(201).send({ orders: allOrders });
});

orderController.post("/create", authentication, async (req, res) => {
  const { userId } = req.body;

  const newOrder = new Order({ ...userId, ...req.body });
  await newOrder.save();
  res.status(201).send({ msg: "New order created" });
});

orderController.patch(
  "/update/id",
  authentication,
  autorization(["Admin"]),
  async (req, res) => {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate({ _id: id });
    console.log(updatedOrder);
    res.status(201).send({ msg: "Order details update" });
  }
);

module.exports = { orderController };
