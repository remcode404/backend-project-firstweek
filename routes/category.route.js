const { Router } = require("express");
const { categoryController } = require("../controllers/categories.controller");

const router = Router()

router.post('/category', categoryController.createCategory)
router.get('/category', categoryController.getAllCategory)
router.delete('/category/:id', categoryController.deleteCategory )


module.exports = router