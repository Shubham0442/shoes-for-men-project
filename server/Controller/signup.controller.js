const { Router } = require("express");
const { User } = require("../Models/user.model");
const bcrypt = require("bcryptjs");

const signupController = Router();

signupController.post("/", async (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, mobile, password, cosign } = req.body;
  console.log(firstname);

  bcrypt.hash(password, 8, async function (error, hash) {
    if (error)
      res.status(401).send({ msg: "something went wrong please signup again" });

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
      console.log(error);
      res.status(401).send({ msg: "something went wrong please signup again" });
    }
  });
});

module.exports = { signupController };
