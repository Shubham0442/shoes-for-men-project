const { Router } = require("express");
const { Address } = require("../Models/address.model");
const { authentication } = require("../Middlewares/authenticate");

const addressController = Router();

addressController.get("/", authentication, async (req, res) => {
  const { userId } = req.body;

  const userAddress = await Address.find({ userId });

  res.status(201).send({ address: userAddress });
});

addressController.post("/create", authentication, async (req, res) => {
  const { userId } = req.body;

  const newAddress = new Address({ userId, ...req.body });
  await newAddress.save();
  res.status(201).send({ msg: "New address added" });
});

addressController.patch("/update/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const updatedAddress = await Address.findByIdAndUpdate(
    { _id: id, userId },
    { ...req.body }
  );
  res.status(201).send({ msg: "Address updated" });
});

addressController.delete("/update/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const removedAddress = await Address.findByIdAndDelete({ _id: id, userId });

  res.status(201).send({ msg: "Address deleted" });
});

module.exports = { addressController };
