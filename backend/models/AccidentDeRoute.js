const mongoose = require("mongoose");

const accidentRouteSchema = new mongoose.Schema({
  Annee: {
    type: Number,
    required: true,
  },
  Categorie: {
    type: String,
    required: true,
  },
  Effectif: {
    type: Number,
    required: true,
  },
});

const AccidentDeRoute = mongoose.model("AccidentDeRoute", accidentRouteSchema);

module.exports = AccidentDeRoute;
