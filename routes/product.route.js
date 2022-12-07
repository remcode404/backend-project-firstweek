const { Router } = require("express");
const { productController } = require("../controllers/product.controller");


const router = Router()

router.get('/product', productController.getAllProduct)
router.post('/product', productController.createProduct)
router.delete('/product/:id', productController.deleteProduct)

module.exports = router