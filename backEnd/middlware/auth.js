const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Non autorizzato" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET environment variable is not defined");
      return res.status(500).json({ message: "Errore di autenticazione interno" });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();

  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token non valido" });
  }
};

module.exports = auth;
