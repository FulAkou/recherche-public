const mongoose = require("mongoose");

const ProgrammeServiceGouvSchema = new mongoose.Schema({
  dateExecution: {
    type: String,
    required: true,
  },
  axe: {
    type: String,
    required: true,
  },
  programme: {
    type: String,
    required: true,
  },
  actionOuSousProgramme: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
    trim: true,
  },
  valeur: {
    type: Number,
    required: true,
    min: 0,
  },
});

const BillanProgrammeServiceGouv = mongoose.model(
  "ProgrammeSeviceGouv",
  ProgrammeServiceGouvSchema
);
module.exports = BillanProgrammeServiceGouv;
