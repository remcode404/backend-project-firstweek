const { Router } = require("express");
const { basketController } = require("../controllers/basket.controller");
// const authMiddleware = require('../middlewares/auth.middleware')

const router = Router();

router.get("/basket/:id", basketController.getBusketByUser);
router.patch("/basket/:id", basketController.addProductToBasket);
router.delete("/basket/:id", basketController.deleteBasket);
router.patch("/basket/edit/:id", basketController.editAmount);

module.exports = router;
