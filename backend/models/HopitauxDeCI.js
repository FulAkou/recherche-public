const mongoose = require("mongoose");

const EtablissementSchema = new mongoose.Schema({
  categorie: {
    type: String,
    required: true,
    enum: ["Hôpital", "Clinique", "Centre de santé", "Pharmacie"], // à adapter selon vos besoins
  },
  nomEtablissement: {
    type: String,
    required: true,
    trim: true,
  },
});

const Etablissement = mongoose.model("HopitauxGeneraux", EtablissementSchema);

module.exports = Etablissement;
