const mongoose = require("mongoose");

const MarcheInternetSchema = new mongoose.Schema({
  annee: { type: Number, required: true },
  categorie: { type: String, required: true },
  sousCategorie: { type: String, required: true },
  entreprise: { type: String, required: true },
  statut: { type: String, required: true },
  valeur: { type: Number, required: true },
});

const MarcheInternet = mongoose.model("MarcheInternet", MarcheInternetSchema);

module.exports = MarcheInternet;
