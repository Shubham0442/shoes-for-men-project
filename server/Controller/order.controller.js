const { Router } = require("express");
const { Order } = require("../Models/order.model");
const { authentication } = require("../Middlewares/authenticate");
const { autorization } = require("../Middlewares/autorization");

const orderController = Router();

orderController.get("/", authentication)