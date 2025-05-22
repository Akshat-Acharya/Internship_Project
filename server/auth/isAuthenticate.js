const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token signature" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = isAuthenticated;
