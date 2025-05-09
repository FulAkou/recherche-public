const mongoose = require("mongoose");

const PoissonViandeSchema = new mongoose.Schema({
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
  type: {
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

const PoissonViande = mongoose.model("PoissonViande", PoissonViandeSchema);
module.exports = PoissonViande;
