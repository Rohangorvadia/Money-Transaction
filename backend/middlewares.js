const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json("hehe");
  }

  const token = authHeader.split(" ")[1];
  console.log("token");
  console.log(token);
  // const decoded = jwt.verify(token, JWT_SECRET);
  // console.log("decoded");
  // console.log(decoded);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json("try-catch");
  }
};

module.exports = {
  authMiddleware,
};
