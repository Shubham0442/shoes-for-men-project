const { Router } = require("express");
const { User } = require("../Models/user.model");
const bcrypt = require("bcryptjs");

const signupController = Router();

signupController.post("/", async (req, res) => {
  const { firstname, lastname, email, mobile, password, cosign } = req.body;

  const existUser = await User?.findOne({ email: email });

  console.log(existUser);

  if (existUser && existUser?.length !== 0)
    res.status(401).send({ msg: "User already exist" });
  else
    bcrypt.hash(password, 8, async function (error, hash) {
      if (error)
        res
          .status(401)
          .send({ msg: "something went wrong please signup again" });

      try {
        const user = new User({
          firstname,
          lastname,
          email,
          mobile,
          password: hash,
          cosign
        });

        await user.save();
        res.status(201).send({ msg: "Sigup Successful" });
      } catch (error) {
        res
          .status(401)
          .send({ msg: "something went wrong please signup again" });
      }
    });
});

module.exports = { signupController };
