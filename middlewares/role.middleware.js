const jsonwebtoken = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    
  const { authorization } = req.headers;

  if (!authorization)
    return res
      .status(401)
      .json({ error: "Вы не авторизованы" });

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer")
    return res.status(401).json({ error: "Неверный тип токена" });

  try {
    const { roles: userRoles } = await jsonwebtoken.verify(
      token,
      process.env.SECRET_JWT_KEY
    );
    let hasRole = false;
    userRoles.forEach((role) => {
      if (role.includes(role)) {
        hasRole = true;
      }
    });
    if (!hasRole) {
      return res.status(401).json({ error: "У вас нет доступа" });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Ошибки в авторизации" + error.toString() });
  }
};
