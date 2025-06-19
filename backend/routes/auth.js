const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const JWT_SECRET = process.env.JWT_SECRET || "votre_secret_jwt_super_securise";

// Route de connexion
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Tentative de connexion pour:", email);

    if (!email || !password) {
      console.log("Email ou mot de passe manquant");
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Utilisateur non trouvé:", email);
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Mot de passe incorrect pour:", email);
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    console.log("Connexion réussie pour:", email);

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Retourner les informations utilisateur et le token
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur de connexion:", error);
    res.status(500).json({ message: "Erreur serveur lors de la connexion" });
  }
});

// Route d'inscription
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Créer le nouvel utilisateur
    const user = new User({
      email,
      password,
    });

    await user.save();

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Retourner les informations utilisateur et le token
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription" });
  }
});

// Route pour obtenir les informations de l'utilisateur connecté
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération des informations:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
