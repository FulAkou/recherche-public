const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "votre_secret_jwt_super_securise";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentification requise" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

module.exports = auth;
