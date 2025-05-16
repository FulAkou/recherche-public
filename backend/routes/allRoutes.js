const router = require("express").Router();
const AsyncHandler = require("express-async-handler");
const matierePrimiere = require("../models/MatierePrimiere");
const disponibiliteInfracture = require("../models/DisponibiliteInfracture");
const Cacao = require("../models/Cacao");
const PoissonViande = require("../models/PoissonViande");
const EffectifInfraEcole = require("../models/EffectifInfraEcole");
const RepartEleveEnseignantParDrenet = require("../models/RepartEleveEnseignantParDrenet");
const MarcheInternet = require("../models/MarcheInternet");
const Indicateur = require("../models/Indicateur");
const BillanProgrammeServiceGouv = require("../models/BillanProgrammeServiceGouv");
const ListeEtablissementScolaire = require("../models/ListeEtablissementScolaire");
const EffectifHopitauxIvoirienCI = require("../models/EffectifHopitauxIvoirienCI");
const Covid19CI = require("../models/Covid19CI");
const AccidentTravail = require("../models/AccidentTravail");
const AccidentDeRoute = require("../models/AccidentDeRoute");

//get all cacao
router.get(
  "/cacao",
  AsyncHandler(async (req, res) => {
    const cacaoData = await Cacao.find({});
    res.status(200).json(cacaoData);
  })
);

//get all effectif Infrastructures et etablissement scolaire
router.get(
  "/effectif-infrastructures",
  AsyncHandler(async (req, res) => {
    const effectifInfraEcoleData = await EffectifInfraEcole.find({});
    res.status(200).json(effectifInfraEcoleData);
  })
);

//get all poisson et viande
router.get(
  "/poisson-viande",
  AsyncHandler(async (req, res) => {
    const poissonViandeData = await PoissonViande.find({});
    res.status(200).json(poissonViandeData);
  })
);

//get all matière première
router.get(
  "/matiere-premiere",
  AsyncHandler(async (req, res) => {
    const matierePrimiereData = await matierePrimiere.find({});
    res.status(200).json(matierePrimiereData);
  })
);

//get all disponibilite et infractuture
router.get(
  "/disponibilite-infractuture",
  AsyncHandler(async (req, res) => {
    const disponibiliteInfractureData = await disponibiliteInfracture.find({});
    res.status(200).json(disponibiliteInfractureData);
  })
);

//get repartition eleve et enseignant par drenet
router.get(
  "/repart-eleve-enseignant-par-drenet",
  AsyncHandler(async (req, res) => {
    const repartEleveEnseignantParDrenetData =
      await RepartEleveEnseignantParDrenet.find({});
    res.status(200).json(repartEleveEnseignantParDrenetData);
  })
);

//get all marche et Internet
router.get(
  "/marche-internet",
  AsyncHandler(async (req, res) => {
    const marcheInternetData = await MarcheInternet.find({});
    res.status(200).json(marcheInternetData);
  })
);

//get all indicateur
router.get(
  "/indicateur",
  AsyncHandler(async (req, res) => {
    const indicateurData = await Indicateur.find({});
    res.status(200).json(indicateurData);
  })
);

//get all billan programme service gouv
router.get(
  "/bilan-programme-service-gouv",
  AsyncHandler(async (req, res) => {
    const billanProgrammeServiceGouvData =
      await BillanProgrammeServiceGouv.find({});
    res.status(200).json(billanProgrammeServiceGouvData);
  })
);

//get all liste etablissement scolaire
router.get(
  "/liste-etablissement-scolaire",
  AsyncHandler(async (req, res) => {
    const listeEtablissementScolaireData =
      await ListeEtablissementScolaire.find({});
    res.status(200).json(listeEtablissementScolaireData);
  })
);

//get all effectif hopitaux
router.get(
  "/effectif-hopitaux",
  AsyncHandler(async (req, res) => {
    const effectifHopitauxIvoirienData = await EffectifHopitauxIvoirienCI.find(
      {}
    );
    res.status(200).json(effectifHopitauxIvoirienData);
  })
);

//get all covid19
router.get(
  "/covid19statistiques",
  AsyncHandler(async (req, res) => {
    const covid19Data = await Covid19CI.find({});
    res.status(200).json(covid19Data);
  })
);

//get all accident travail
router.get(
  "/accident-travail",
  AsyncHandler(async (req, res) => {
    const accidentTravailData = await AccidentTravail.find({});
    res.status(200).json(accidentTravailData);
  })
);

router.get(
  "/accident-de-route",
  AsyncHandler(async (req, res) => {
    const accidentDeRouteData = await AccidentDeRoute.find({});
    res.status(200).json(accidentDeRouteData);
  })
);

module.exports = router;
