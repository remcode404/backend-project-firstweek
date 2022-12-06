const Product = require("../models/Product.model");

module.exports.productController = {
  createProduct: async (req, res) => {
    try {
      const { name, price, img, categoryId } = req.body;
      const product = await Product.create({
        name,
        price,
        img,
        categoryId,
      });
      return res.json(product);
    } catch (e) {
      res.json({ e: e.message });
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const product = await Product.find();
      return res.json(product);
    } catch (e) {
      res.json({ e: e.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);

      return res.json("DELETED");
    } catch (e) {
      res.json({ e: e.message });
    }
  },
  //end
};

//name price img
