const { Router } = require("express");
const { basketController } = require("../controllers/basket.controller");
// const authMiddleware = require('../middlewares/auth.middleware')

const router = Router();

// router.get("/basket/:id", basketController.addBasket);
router.post("/basket/:id", basketController.addBasket);
router.delete('/basket/:id', basketController.deleteBasket)
router.patch('/basket/:id', basketController.editBasket)


module.exports = router;
