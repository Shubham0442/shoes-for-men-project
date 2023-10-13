const { Router } = require("express");
const { authentication } = require("../Middlewares/Authenticate");
const { autorization } = require("../Middlewares/Autorization");
const { Shoe } = require("../Models/shoe.model");
require("dotenv").config();

const shoeController = Router();

shoeController.get("/", async (req, res) => {
  const { skip, limit } = req.body;
  const shoeData = await Shoe.find().skip(skip).limit(limit);
  res.status(200).send({ shoesData: shoeData });
});

shoeController.post(
  "/create",
  authentication,
  autorization(["Admin"]),
  async (req, res) => {
    const { userId } = req.body;
    const newShoe = new Shoe({ userId, ...req.body });
    await newShoe.save();
    res.status(201).send({ msg: "New Show data added" });
  }
);

shoeController.post(
  "/createMany",
  authentication,
  autorization(["Admin"]),
  async (req, res) => {
    const { userId } = req.body;

    const allShoes = req?.body?.data?.map((el) => {
      return { ...el, userId };
    });
    console.log(allShoes);

    const newShoe = Shoe.insertMany(allShoes);
    await newShoe;
    res.status(201).send({ msg: "New Show data added" });
  }
);

module.exports = { shoeController };
