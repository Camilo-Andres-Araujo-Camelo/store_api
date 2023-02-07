const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (bearerToken) {
    const token = bearerToken.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, "HS512");
      next();
    } catch (error) {
      res.status(401).json({ message: "no token" });
    }
  } else {
    res.status(498).json({ message: "No token provided" });
  }
};

module.exports = authenticate;
