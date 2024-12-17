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
  const { skip, limit, brand, category, Rate, order, search } = req.query;
  let aggregatePipeline = [];
  let matchStage = {};

  try {
    if (brand) matchStage.brand = { $in: brand };
    if (category) matchStage.category = { $in: category };
    if (Rate) matchStage.Rate = { $in: Rate };

    // Added for future search functionality

    // if (search) {
    //   matchStage.$or = [
    //     { brand: { $regex: search, $options: "i" } },
    //     { category: { $regex: search, $options: "i" } },
    //     { suitable_for: { $regex: search, $options: "i" } },
    //     { name: { $regex: search, $options: "i" } }
    //   ];
    // }

    if (Object.keys(matchStage).length > 0) {
      aggregatePipeline.push({ $match: matchStage });
    }

    if (order) {
      aggregatePipeline.push({ $sort: { price: Number(order) } });
    }

    const totalLengthData = await Shoe.countDocuments();

    const shoesData = await Shoe.aggregate(aggregatePipeline)
      .skip(Number(skip) || 0)
      .limit(Number(limit) || 6);

    if (shoesData.length === 0) {
      return res.send({ msg: "No data found", shoesData: [] });
    }

    const totalFilteredCount = await Shoe.aggregate(aggregatePipeline).count(
      "count"
    );

    res.send({
      msg: "shoes data successfully loaded",
      shoesData: shoesData,
      totalLength: totalLengthData,
      totalFilteredCount: totalFilteredCount[0].count
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
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

shoeController.get("/getdetails/:id", async (req, res) => {
  const { id } = req.params;
  const shoeDetails = await Shoe.find({ _id: id });

  res.status(201).send({ msg: "success", shoeDetails });
});

module.exports = { shoeController };
