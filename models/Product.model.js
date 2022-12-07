const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  weight: String,
  img: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
