const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  password: { type: String, required: true },
  cosign: {
    type: String,
    enum: ["user", "Admin"],
    default: "user",
    required: true
  }
});

const User = mongoose.model("user", userSchema);

module.exports = { User };
