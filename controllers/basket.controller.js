const Basket = require("../models/Basket.model");
// const Product = require("../models/Product.model");
// const { findById } = require("../models/Users.model");
// const User = require("../models/Users.model");

module.exports.basketController = {
  // ВЫВОД КОРЗИНЫ
  getBusketByUser: async (req, res) => {
    try {
      const data = await Basket.findOne({ userId: req.params.id });
      return res.json(data);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  // ДОБАВЛЕНИЕ ТОВАРА В КОРЗИНУ
  addProductToBasket: async (req, res) => {
    try {
      const { product } = req.body;
      const data = await Basket.findByIdAndUpdate(req.params.id, {
        $push: {
          products: product,
        },
      });
      res.json(data);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  // ИЗМЕНЕНИЕ СЧЕТЧИКА AMOUNT
  editAmount: async (req, res) => {
    try {
      // НАХОДИМ НАШУ КОРЗИНУю
      const basket = await Basket.findById(req.params.id);
      const type = req.body.type;

      // НАХОДИМ НАШ ЭЛЕМЕНТ И МЕНЯЕМ АМОУНТ НА + 1, И СОХРАНЯЕМ НОВЫЙ МАССИВ В НАШУ ПЕРЕМЕННУЮ
      const newData = await basket.products.map((item) => {
        if (
          item._id.toString() === req.body.productId.toString() &&
          type === "plus"
        ) {
          item.amount += 1;
        } else if (
          item._id.toString() === req.body.productId.toString() &&
          type === "minus"
        ) {
          item.amount -= 1;
        }
        return item;
      });

      // ОБРАЩАЕМСЯ К КОРЗИНЕ И ЗАМЕНЯЕМ ЗНАЧЕНИЕ КЛЮЧА PRODUCTS НА НОВЫЙ НАШ ИЗМЕНЕННЫЙ МАССИВ
      await basket.updateOne({ products: newData });

      res.json(basket);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  // УДАЛЕНИЕ ТОВАРА ИЗ КОРЗИНЫ
  deleteBasket: async (req, res) => {
    try {
      const data = await Basket.findByIdAndUpdate(req.params.id, {
        $pull: {
          products: { _id: req.body.productId },
        },
      });
      res.json(data);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
