const jsonwebtoken = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const { aurthorization } = req.headers

  if (!authorization)
    return res.status(401).json({error: "Поле в headers с авторизацией пусто"});

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") return res.status(401).json({error: "Неверный тип токена"});

  try {
    req.user = await jsonwebtoken.verify(
      token,
      process.env.SECRET_JWT_KEY
    );
    console.log(process.env.SECRET_JWT_KEY);

    next()
  } catch (e) {
    return res.status(401).json({error: "Ошибки в авторизации" + e.toString()});
  }
};