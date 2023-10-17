const { Router } = require("express");
const { User } = require("../Models/user.model");
const { authentication } = require("../Middlewares/authenticate");
const { autorization } = require("../Middlewares/autorization");

const userController = Router();

userController.get(
  "/",
  authentication,
  autorization(["Admin"]),
  async (req, res) => {
    const { userId } = req.body;
    const users = await User.find({ cosign: "user" });
    console.log(users);
    res.send(201).send({ users: users });
  }
);

module.exports = { userController };
