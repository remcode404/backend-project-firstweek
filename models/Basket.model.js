const mongoose = require("mongoose");
const { SchemaTypes } = require("mongoose");

const basketSchema = mongoose.Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: SchemaTypes.ObjectId,
        ref: "Product"
      },
      amount:{type: Number, default: 1},
    },
  ],
  total: Number,
});

const Basket = mongoose.model("Basket", basketSchema);

module.exports = Basket;
