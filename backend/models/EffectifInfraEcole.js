const mongoose = require("mongoose");

const EffectifEcoleSchema = new mongoose.Schema({
  periode: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    enum: ["PUBLIC", "PRIVE"],
    required: true,
  },
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
  effectif: {
    type: Number,
    required: true,
  },
});

const EffectifInfraEcole = mongoose.model("EffectifEcole", EffectifEcoleSchema);
module.exports = EffectifInfraEcole;
