const mongoose = require("mongoose");

const ListeEtablissementScolaireSchema = new mongoose.Schema({
  nomEtablissement: {
    type: String,
    required: true,
    trim: true,
  },
  situationGeographique: {
    type: String,
    default: null,
    trim: true,
  },
  dren: {
    type: Number,
    required: true,
  },
  statut: {
    type: String,
    enum: ["PUBLIC", "PRIVE"],
    required: true,
  },
  type: {
    type: String,
    enum: ["MIXTE", "FEMININ", "MASCULIN"],
    required: true,
  },
});

const ListeEtablissementScolaire = mongoose.model(
  "EtablissementScolaire",
  ListeEtablissementScolaireSchema
);

module.exports = ListeEtablissementScolaire;
