const { Router } = require("express");
const { Order } = require("../Models/order.model");
const { authentication } = require("../Middlewares/authenticate");
const { autorization } = require("../Middlewares/autorization");

const orderController = Router();

orderController.get("/", authentication, async (req, res) => {
  const { userId } = req.body;

  const allOrders = await Order.find({ userId });

  res.status(201).send({ orders: allOrders });
});

orderController.post("/create", authentication, async (req, res) => {
  const { userId } = req.body;

  const newOrder = new Order({ ...userId, ...req.body });
  await newOrder.save();
  res.status(201).send({ msg: "New order created" });
});

orderController.get(
  "/details/:id",
  authentication,
  autorization(["Admin"]),
  async (req, res) => {
    const { id } = req.params;
    const orders = await Order.find({ userId: id });
    res.status(201).send({ orders });
  }
);

orderController.put(
  "/update/:id",
  authentication,
  autorization(["Admin"]),
  async (req, res) => {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: id },
      { $set: { orderStatus } }
    );
    res.status(201).send({ msg: "Order details updated" });
  }
);

module.exports = { orderController };
