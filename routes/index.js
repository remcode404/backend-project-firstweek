const { Router } = require("express");
const router = Router();

router.use(require("./users.route"));
router.use(require("./category.route"));
router.use(require("./product.route"));
router.use(require("./basket.route"));

module.exports = router;
