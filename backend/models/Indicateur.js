const mongoose = require("mongoose");

const IndicateurSchema = new mongoose.Schema({
  annee: { type: Number, required: true },
  indicateur: { type: String, required: true },
  valeur: { type: Number, required: true },
});

const Indicateur = mongoose.model("Indicateur", IndicateurSchema);

module.exports = Indicateur;
