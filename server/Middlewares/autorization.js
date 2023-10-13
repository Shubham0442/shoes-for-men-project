const { User } = require("../Models/user.model");

const autorization = (roles) => async (req, res, next) => {
  const permittedRoles = roles;

  const { userId } = req.body;

  const user = await User.findOne({ _id: userId });
  if (permittedRoles?.includes(user.cosign)) next();
  else res.send({ msg: "Unautorised Access" });
};

module.exports = { autorization };
