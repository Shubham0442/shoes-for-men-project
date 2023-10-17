const { Router } = require("express");
const { authentication } = require("../Middlewares/authenticate");
const { autorization } = require("../Middlewares/autorization");
const { Shoe } = require("../Models/shoe.model");
require("dotenv").config();

const shoeController = Router();

const setQuery = (brand, category, Rate) => {
  const filter = {};
  if (brand) filter.brand = { $in: brand };
  if (category) filter.category = { $in: category };
  if (Rate) filter.Rate = { $in: Rate };
  return filter;
};

shoeController.get("/", async (req, res) => {
  const { skip, limit, brand, category, Rate, order } = req.query;

  if (skip && limit) {
    const query = setQuery(brand, category, Rate);
    const shoeData = await Shoe.find(query)
      .sort({ price: order })
      .skip(Number(skip))
      .limit(Number(limit));
    res.status(200).send({ shoesData: shoeData });
  }
});

shoeController.get("/dashboard", async (req, res) => {
  const shoeData = await Shoe.find();
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
  "/createmany",
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

shoeController.patch(
  "/update/:id",
  authentication,
  autorization(["Admin"]),
  async (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    const updatedShoesData = await Shoe.findByIdAndUpdate(
      { _id: id },
      { ...payload }
    );

    res.status(201).send({ msg: "Shoe details updated" });
  }
);

shoeController.delete(
  "/remove/:id",
  authentication,
  autorization(["Admin"]),
  async (req, res) => {
    const { id } = req.params;
    const deleteShoe = await Shoe.findByIdAndDelete({ _id: id });

    res.status(201).send({ msg: "Shoe deleted" });
  }
);

module.exports = { shoeController };
