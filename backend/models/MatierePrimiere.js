const mongoose = require("mongoose");

const MatierePrimiereSchema = new mongoose.Schema({
  annee: Number,
  matiere: String,
  categorie: String,
  sousCategorie: String,
  status: String,
  valeur: Number,
});

const MatierePrimiere = mongoose.model(
  "MatierePrimiere",
  MatierePrimiereSchema
);

module.exports = MatierePrimiere;
