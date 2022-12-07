const Basket = require("../models/Basket.model");

module.exports.basketController = {
  // Добавление товара в корзину:
  addBasket: async (req, res) => {
    try {
      const { userId, productId } = req.body;
      const data = await Basket.create({
        userId,
        productId,
      });
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  // Изменение товара в корзине:
  editBasket: async (req, res) => {
    try {
      if (req.body.type === 'plus') {
        const data = await Basket.findById(
          req.params.id
        );
        const addProduct = data.map( item =>  {
          if (item.productId.toString() === req.body.productId) {
            item.amount +=1
          }
          return item
        })
        const result = await data.updateOne(addProduct, {new: true})
        res.json(result);
      } else {
        const data = await Basket.findByIdAndUpdate(
          req.params.id,
          {
            amount: amount -1
          },
        );
        res.json(data);
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  // Удаление товара из корзины:
  deleteBasket: async (req, res) => {
    try {
      await Basket.findByIdAndRemove(req.params.id);
      res.json("Удалено");
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
