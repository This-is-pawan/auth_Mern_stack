require("dotenv").config();
const jwt = require("jsonwebtoken");

const userAuthanticationCheck = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.json({ success: false, message: "unauthorized ,login again" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      res.json({ success: false, message: "invalid token" });
    }
    req.userId = decoded.id;
   next()
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = { userAuthanticationCheck };
