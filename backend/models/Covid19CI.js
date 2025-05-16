const mongoose = require("mongoose");

const Covid19StatsSchema = new mongoose.Schema({
  codeISO: { type: String, required: true },
  continent: { type: String },
  paysOuRegion: { type: String },
  date: { type: Date },

  totalCas: { type: Number },
  nouveauxCas: { type: Number },
  nouveauxCasLisses: { type: Number },
  totalDeces: { type: Number },
  nouveauxDeces: { type: Number },
  nouveauxDecesLisses: { type: Number },

  totalCasParMillion: { type: Number },
  nouveauxCasParMillion: { type: Number },
  nouveauxCasLissesParMillion: { type: Number },
  totalDecesParMillion: { type: Number },
  nouveauxDecesParMillion: { type: Number },
  nouveauxDecesLissesParMillion: { type: Number },

  tauxReproduction: { type: Number },

  totalTestsRealise: { type: Number },
  nouveauxTests: { type: Number },
  totalTestsPourMille: { type: Number },
  nouveauxTestsPourMille: { type: Number },
  nouveauxTestsLisses: { type: Number },
  nouveauxTestsLissesPourMille: { type: Number },

  tauxPositivite: { type: Number },
  testsParCas: { type: Number },
  unitesTests: { type: String, default: null },

  totalVaccinations: { type: Number },
  personnesVaccinees: { type: Number },
  personnesCompletementVaccinees: { type: Number },
  dosesRappel: { type: Number },
  nouvellesVaccinations: { type: Number },
  nouvellesVaccinationsLisses: { type: Number },
  totalVaccinationsPourCent: { type: Number },
  personnesVaccineesPourCent: { type: Number },
  personnesCompletementVaccineesPourCent: { type: Number },
  dosesRappelPourCent: { type: Number },
  nouvellesVaccinationsLissesParMillion: { type: Number },
  newPeopleVaccinatedSmoothed: { type: Number },
  newPeopleVaccinatedSmoothedPerHundred: { type: Number },

  indiceRigueur: { type: Number },

  population: { type: Number },
  densitePopulation: { type: Number },
  ageMedian: { type: Number },
  partPopulation65Plus: { type: Number },
  partPopulation70Plus: { type: Number },

  pibParHabitant: { type: Number },
  pauvreteExtremepourcent: { type: Number },
  mortaliteCardioVasculaire: { type: Number },
  prevalenceDiabete: { type: Number },
  accesLavageMains: { type: Number },
  esperanceVie: { type: Number },
  indiceDeveloppementHumain: { type: Number },
  tauxPositiviteRecalcule: { type: Number },
});

const Covid19Stat = mongoose.model("Covid19Stat", Covid19StatsSchema);

module.exports = Covid19Stat;
