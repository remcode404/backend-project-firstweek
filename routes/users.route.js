const { userController } = require('../controllers/users.controller')
const { Router } = require('express')
// const authMiddleware = require('../middlewares/auth.middleware')


const router = Router()

router.get('/users', userController.getAllUsers)
router.post('/auth', userController.registerUser)
router.post('/login', userController.loginUser)

module.exports = router;