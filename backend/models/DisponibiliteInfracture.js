const mongoose = require("mongoose");

const EcoleSchema = new mongoose.Schema({
  dren: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    enum: ["PRIVE", "PUBLIC", "COMMUNAUTAIRE"],
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  effectif: {
    type: Number,
    required: true,
  },
});

const disponibiliteInfracture = mongoose.model(
  "disponibiliteInfracture",
  EcoleSchema
);

module.exports = disponibiliteInfracture;
