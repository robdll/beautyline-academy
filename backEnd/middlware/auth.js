const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    
    const secret = process.env.JWT_SECRET || "defaultsecret";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;

