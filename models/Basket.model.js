const mongoose = require("mongoose");
const { SchemaTypes } = require("mongoose");

const basketSchema = mongoose.Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
  productId: {
    type: SchemaTypes.ObjectId,
    ref: "Product",
  },
  amount: Number,
  total: Number,
});

const Basket = mongoose.model("Basket", basketSchema);

module.exports = Basket;
