const mongoose = require("mongoose");

const CacaoSchema = new mongoose.Schema({
  annee: { type: Number },
  prixProductionFCFAkg: { type: Number },
  productionTonnes: { type: Number },
});

const Cacao = mongoose.model("Cacao", CacaoSchema);

module.exports = Cacao;
