const User = require("../models/Users.model");
const Role = require("../models/Roles.model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Basket = require("../models/Basket.model");


module.exports.userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  },

  deleteUsers: async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      res.status(200).json("Пользователь удален");
    } catch (error) {
      res.status(401).json({ message: "Ошибка при удалении" });
    }
  },

  createRoles: async (req, res) => {
    try {
      const { value } = req.body;
      const role = await Role.create({ value });
      res.json(role);
    } catch (error) {
      console.log(error);
    }
  },

  registerUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(401)
          .json({ message: "Ошибка при регистрации" , errors });
      }
      const { usersName, email, phone, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(401)
          .json({ message: `Этот адрес электронной почты ${email} уже существует` });
      }

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const userRole = await Role.findOne({ value: "USER" });
      const user = await User.create({
        usersName,
        email,
        phone,
        password: hash,
        roles: [userRole.value],
      });
      await user.save();
      res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Ошибка регистрации" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { phone, email, password } = req.body;

      if((!!email && !!phone) || (!email && !phone)){
        return res.status(401).json("Следует указать адрес электронной почты, либо номер телефона.");
      }
      const candidate = await User.findOne(email ? {email}: {phone} );

      if (!candidate ) {
        return res.status(401).json("Учетные данные недействительны!");
       }
      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json("Неверный пароль");
      }

      const basket = await Basket.findOne({userId: candidate._id})
      if (basket === null) {
        await Basket.create({userId: candidate._id})
      }
      console.log("basket", basket);

      const payload = {
        id: candidate._id,
        phone: candidate.phone,
        email: candidate.email,
        roles: candidate.roles,
      };
      const token = await jsonwebtoken.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });
      res.json(token);
    } catch (error) {
      console.log(error);
    }
  },
};
