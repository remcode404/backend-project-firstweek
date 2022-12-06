const Basket = require("../models/Basket.model");

module.exports.postsController = {
  createBasket: async (req, res) => {
    try {
      const { userId, productId } = req.body;
      const data =await Basket.create({
        userId,
        productId,
      });
      const prod = await Basket.findById(data._id).populate()
      res.json("Товар добавлен");
    } catch (err) {
      res.json(err);
    }
  },

//   like: async (req, res) => {
//     // Указывается postId  и передается userId пользователя который ставит лайк, если пользователь уже поставил ранее лайк, лайк убирается
//     try {
//       const post = await Post.findById(req.params.id);
//       if (!post.likes.includes(req.body.userId)) {
//         await post.updateOne({ $push: { likes: req.body.userId } });
//         res.json("The post has been liked");
//       } else {
//         await post.updateOne({ $pull: { likes: req.body.userId } });
//         res.json("The post has been disliked");
//       }
//     } catch (err) {
//       res.json(err);
//     }
//   },

//   getLikedPosts: async (req, res) => {
//     // Вывод всех понравивших постов пользователю
//     try {
//       const result = await Post.find({ likes: req.params.id });
//       res.json(result);
//     } catch (err) {
//       res.json(err);
//     }
//   },
};