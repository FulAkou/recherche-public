const mongoose = require("mongoose");

const MatierePrimiereSchema = new mongoose.Schema({
  annee: {
    type: Number,
    required: true,
  },
  matiere: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  sousCategorie: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  valeur: {
    type: Number,
    required: true,
  },
});

const MarcheInternetSchema = new mongoose.Schema({
  annee: { type: Number, required: true },
  categorie: { type: String, required: true },
  sousCategorie: { type: String, required: true },
  entreprise: { type: String, required: true },
  statut: { type: String, required: true },
  valeur: { type: Number, required: true },
});

const IndicateurSchema = new mongoose.Schema({
  annee: { type: Number, required: true },
  indicateur: { type: String, required: true },
  valeur: { type: Number, required: true },
});

const CacaoSchema = new mongoose.Schema({
  annee: { type: Number, required: true },
  prixProductionFCFAkg: { type: Number, required: true },
  productionTonnes: { type: Number, required: true },
});

const MatierePrimiere = mongoose.model(
  "MatierePrimiere",
  MatierePrimiereSchema
);
const MarcheInternet = mongoose.model("MarcheInternet", MarcheInternetSchema);
const Indicateur = mongoose.model("Indicateur", IndicateurSchema);
const Cacao = mongoose.model("Cacao", CacaoSchema);

module.exports = {
  MatierePrimiere,
  MarcheInternet,
  Indicateur,
  Cacao,
};
