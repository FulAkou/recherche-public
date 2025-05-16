const mongoose = require("mongoose");

const HopitauxIvoirienCISchema = new mongoose.Schema({
  annee: {
    type: Number,
    required: true,
  },
  regions: {
    type: String,
    required: true,
  },
  districtsVillesCommunes: {
    type: String,
  },
  categories: {
    type: String,
    required: true,
    enum: [
      "Medecins",
      "Medecine",
      "Chirurgie",
      "Pediatrie",
      "Gyneco",
      "Autres services",
      "Blocs operatoires",
      "Services de radiologie",
      "Cabinets dentaires",
      "Laboratoires d'analyse",
      "MAT",
      "Hopitaux Generaux (HG)",
      "CHR",
      "CHU",
      "Etablissements Sanitaires de Premier Contact (ESPC)",
      "Infirmiers",
      "Sage-femmes",
    ],
  },
  effectifs: {
    type: Number,
    required: true,
    min: 0,
  },
});

const EffectifHopitauxIvoirienCI = mongoose.model(
  "HopitauxIvoirienCI",
  HopitauxIvoirienCISchema
);

module.exports = EffectifHopitauxIvoirienCI;
