const Basket = require("../models/Basket.model");
const Product = require("../models/Product.model");
const { findById } = require("../models/Users.model");
const User = require("../models/Users.model");

module.exports.basketController = {
  // Добавление товара в корзину:
  // addBasket: async (req, res) => {
  //   try {
  //     const { userId, productId } = req.body;
  //     const data = await Basket.create({
  //       userId,
  //       productId,
  //     });
  //     res.json(data);
  //   } catch (err) {
  //     res.json(err);
  //   }
  // },

  addBasket: async (req, res) => {
    try {
      const { userId, productId } = req.body;
      const data = await Basket.findByIdAndUpdate(req.params.id, {
        $push: {
          products: req.body.product,
        },
      });
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },

  editAmount: async (req, res) => {
    try {
      // НАХОДИМ НАШУ КОРЗИНУ
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
    } catch (err) {
      res.json(err);
    }
  },

  // Изменение товара в корзине:
  // editBasket: async (req, res) => {
  //   const condidate = await User.findById(req.params.id);
  //   const product = await Product.findById(req.body.productId);
  //   const price = product.price;
  //   try {
  //     let isAdded = 0;
  //     condidate.basket.map((item) => {
  //       if (String(item.productId) === String(req.body.productId)) {
  //         isAdded += 1;
  //       }
  //       return item;
  //     });
  //     if (req.body.type === "plus") {
  //       if (isAdded) {
  //         const newBasket = condidate.basket.map((item) => {
  //           if (String(item.productId) === String(req.body.productId)) {
  //             item.amount += 1;
  //           }
  //           return item;
  //         });
  //         await User.findByIdAndUpdate(
  //           req.params.id,
  //           { basket: newBasket },
  //           { new: true }
  //         );
  //       } else {
  //         await User.findByIdAndUpdate(
  //           req.params.id,
  //           {
  //             $push: { basket: { productId: req.body.productId, amount: 1 } },
  //           },
  //           { new: true }
  //         );
  //       }

  //       await User.findByIdAndUpdate(req.params.id, {
  //         total: condidate.total + price,
  //       });
  //     }
  //     if (req.body.type === "minus") {
  //       if (isAdded) {
  //         const newBasket = condidate.basket.map((item) => {
  //           if (String(item.productId) === String(req.body.productId)) {
  //             if (item.amount === 1) {
  //               return null;
  //             } else {
  //               item.amount -= 1;
  //             }
  //           }
  //           return item;
  //         });
  //         await User.findByIdAndUpdate(
  //           req.params.id,
  //           { basket: newBasket.filter((item) => item !== null) },
  //           { new: true }
  //         );
  //         await User.findByIdAndUpdate(req.params.id, {
  //           total: condidate.total - price,
  //         });
  //       } else {
  //         return res.json({ error: "товара нет в корзине" });
  //       }
  //     }

  //     const result = await User.findById(req.params.id);
  //     res.json(result);
  //   } catch (error) {
  //     res.json({ error: error.message });
  //   }
  // },
  // Удаление товара из корзины:
  deleteBasket: async (req, res) => {
    try {
      const data = await Basket.findByIdAndUpdate(req.params.id, {
        $pull: {
          products: { _id: req.body.productId },
        },
      });
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
};
