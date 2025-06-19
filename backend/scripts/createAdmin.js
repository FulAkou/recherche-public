require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const connectToDB = require("../connect-to-DB/connectToDB");

const createAdminUser = async () => {
  try {
    // Connexion à la base de données
    await connectToDB();

    // Vérifier si l'admin existe déjà
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (adminExists) {
      console.log("L'utilisateur admin existe déjà");
      process.exit(0);
    }

    // Créer l'utilisateur admin
    const admin = new User({
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });

    await admin.save();
    console.log("Utilisateur admin créé avec succès");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la création de l'admin:", error);
    process.exit(1);
  }
};

createAdminUser();
