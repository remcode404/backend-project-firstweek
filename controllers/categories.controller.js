const Category = require("../models/Category.model");

module.exports.categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const category = await Category.find();
      res.json(Category);
    } catch (e) {
      res.json({ e: e.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.create({
        name,
      });
      res.json(category);
    } catch (e) {
      res.json({ e: e.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json("DELETED");
    } catch (e) {
      res.json({ e: e.message });
    }
  },
};
