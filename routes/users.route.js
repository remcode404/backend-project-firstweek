const { userController } = require("../controllers/users.controller");
const { Router } = require("express");
// const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const { check } = require("express-validator");

const router = Router();

router.get("/users", roleMiddleware, userController.getAllUsers);
router.post(
  "/auth",
  [check("usersName", "Имя пользователя не может быть пустым").notEmpty()],
  [
    check(
      "password",
      "Пароль должен быть больше 4 символов, но не более 15 символов"
    ).isLength({ min: 4, max: 15 }),
  ],
  userController.registerUser
);
router.post("/login", userController.loginUser);
router.post("/role", roleMiddleware, userController.createRoles);
router.delete("/users/:id", roleMiddleware, userController.deleteUsers);

module.exports = router;
