const { Router } = require("express");
const { basketController } = require("../controllers/basket.controller");
// const authMiddleware = require('../middlewares/auth.middleware')

const router = Router();

router.post('/basket/:id', basketController.addBasket)
router.patch('/basket/edit/:id', basketController.editAmount)
router.delete('/basket/:id', basketController.deleteBasket)


module.exports = router;
