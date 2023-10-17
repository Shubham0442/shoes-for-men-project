const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { User } = require("../Models/user.model");

const loginController = Router();

loginController.post("/", async function (req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    const hash = user?.password;
    bcrypt.compare(password, hash, async function (_error, result) {
      if (!result)
        res.status(401).send({ msg: "something went wrong, please try again" });
      else if (result === true) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        res.status(201).send({
          msg: "Login Successful",
          token: token,
          user: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            mobile: user.mobile,
            cosign: user.cosign,
            email: user.email
          }
        });
      } else res.send({ msg: "something went wrong, please try again" });
    });
  } else
    res.status(404).send({ msg: "something went wrong, please try again" });
});

module.exports = { loginController };
