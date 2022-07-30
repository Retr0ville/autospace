const jwt = require("jsonwebtoken");

const sauce = process.env.JWTOKEN;
export const validateToken = (req, res, next) => {
  const { authorization } = req.headers || null;
  const token = authorization && authorization.split(" ")[1];

  if (!token) {
    return res
      .status(400)
      .send({ error: "unauthorized, please login or register" });
  }
  // verify token
  jwt.verify(token, sauce, (err, decoded) => {
    if (err)
      return res.status(400).send({ error: "couldn't verify your identity" });
    req.jwtData = decoded;
    next();
  });
};
