const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema({
  value: {
    type: String,
    unique: true,
    default: "USER",
  },
});

const Role = mongoose.model("Role", rolesSchema);

module.exports = Role;
