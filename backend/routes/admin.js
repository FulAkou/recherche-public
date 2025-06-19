const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// Middleware pour vérifier si l'utilisateur est admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Accès non autorisé" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer tous les utilisateurs
router.get("/users", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
});

// Créer un nouvel utilisateur
router.post("/users", auth, isAdmin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Créer le nouvel utilisateur
    const user = new User({
      email,
      password,
      role: "user", // Par défaut, les nouveaux utilisateurs sont des utilisateurs normaux
    });

    await user.save();

    // Retourner l'utilisateur sans le mot de passe
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur" });
  }
});

// Supprimer un utilisateur
router.delete("/users/:userId", auth, isAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    // Empêcher la suppression de son propre compte
    if (userId === req.user.userId) {
      return res
        .status(400)
        .json({ message: "Vous ne pouvez pas supprimer votre propre compte" });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
});

module.exports = router;
