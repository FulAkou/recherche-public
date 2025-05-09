const mongoose = require("mongoose");

const RepartEleveEnseignantParDrenetSchema = new mongoose.Schema({
  periode: {
    type: String,
    required: true,
  },
  statut: { type: String, required: true },
  ville: {
    type: String,
    required: true,
    trim: true,
  },
  drenet: {
    type: String,
    required: true,
  },
  sexe: {
    type: String,
    enum: ["MASCULIN", "FEMININ"],
    required: true,
  },
});

const RepartEleveEnseignantParDrenet = mongoose.model(
  "RepartEleveEnseignantParDrenet",
  RepartEleveEnseignantParDrenetSchema
);

module.exports = RepartEleveEnseignantParDrenet;
