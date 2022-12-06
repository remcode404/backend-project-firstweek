const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  usersName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    type: String,
    ref: "Role",
  }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
