const { Router } = require('express')
const router = Router()

router.use(require('./users.route'))
router.use(require("./basket.routes"))

module.exports = router