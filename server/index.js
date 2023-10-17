const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connect } = require("./config/db");
const { signupController } = require("./Controller/signup.controller");
const { loginController } = require("./Controller/login.controller");
const { shoeController } = require("./Controller/shoe.controller");
const { cartController } = require("./Controller/cart.controller");
const { addressController } = require("./Controller/address.controller");
const { orderController } = require("./Controller/order.controller");
const { userController } = require("./Controller/user.controller");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/signup", signupController);
app.use("/login", loginController);
app.use("/shoes", shoeController);
app.use("/cart", cartController);
app.use("/address", addressController);
app.use("/orders", orderController);
app.use("/userdata", userController);

const PORT = process.env.PORT || 5050;

app.listen(PORT, async (req, res) => {
  try {
    await connect;
    console.log("app is running on http://localhost:" + PORT);
  } catch (error) {
    console.log(error);
  }
});
