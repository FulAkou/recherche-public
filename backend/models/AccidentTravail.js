const mongoose = require("mongoose");

const accidentTravailSchema = new mongoose.Schema({
  annee: {
    type: Number,
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
  nombreDaccidentsAuTravail: {
    type: Number,
    required: false,
  },
});

const AccidentTravail = mongoose.model(
  "AccidentDeTravail",
  accidentTravailSchema
);

module.exports = AccidentTravail;
