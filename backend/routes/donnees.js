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

const MODELS = {
  cacao: Cacao,
  "effectif-infrastructures": EffectifInfraEcole,
  "poisson-viande": PoissonViande,
  "matiere-premiere": matierePrimiere,
  "disponibilite-infractuture": disponibiliteInfracture,
  "repartition-eleve-enseignant-par-drenet": RepartEleveEnseignantParDrenet,
  "marche-internet": MarcheInternet,
  indicateur: Indicateur,
  "bilan-programme-service-gouv": BillanProgrammeServiceGouv,
  "Liste-etablissement-scolaire": ListeEtablissementScolaire,
};

router.get(
  "/donnees",
  AsyncHandler(async (req, res) => {
    const type = req.query.type;

    if (!type || !MODELS[type]) {
      return res
        .status(400)
        .json({ message: "Type de données invalide ou manquant." });
    }

    const data = await MODELS[type].find({});
    res.status(200).json(data);
  })
);

module.exports = router;
