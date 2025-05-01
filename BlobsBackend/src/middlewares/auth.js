const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    // const token = req.header("Authorization")?.replace("Bearer ", "");
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user)
      return res
        .status(401)
        .json({ message: "User not found. Invalid token." });

    req.user = user;
    console.log(req.user)
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
