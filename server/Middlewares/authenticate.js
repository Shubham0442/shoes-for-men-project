require("dotenv").config();
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  if (!req.headers.authorization)
    res.status(401).send({ msg: "Please login again" });
  const token = req?.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, async function (error, decoded) {
    if (error) res.status(401).send({ msg: "something went wrong" });
    else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};

module.exports = { authentication };
