const router = require("express").Router();
const AsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const MatierePrimiere = require("./models/MatierePrimiere");
const MatierePrimiereData = require("./data/MatierePrimiereData");
const Cacao = require("./models/Cacao");
const CacaoData = require("./data/CacaoData");
const PoissonViande = require("./models/PoissonViande");
const PoissonViandeData = require("./data/PoissonViandeData");
const Indicateur = require("./models/Indicateur");
const IndicateurData = require("./data/IndicateurData");
const MarcheInternet = require("./models/MarcheInternet");
const MarcheInternetData = require("./data/MarcheInternetData");
const DisponibiliteInfracture = require("./models/DisponibiliteInfracture");
const DisponibiliteInfractureData = require("./data/DisponibiliteInfractureData");
const EffectifInfraEcole = require("./models/EffectifInfraEcole");
const EffectifInfraEcoleData = require("./data/EffectifInfraEcoleData");
const RepartEleveEnseignantParDrenet = require("./models/RepartEleveEnseignantParDrenet");
const RepartEleveEnseignantParDrenetData = require("./data/RepartEleveEnseignantParDrenetData");
const BillanProgrammeServiceGouv = require("./models/BillanProgrammeServiceGouv");
const BillanProgrammeServiceGouvData = require("./data/BillanProgrammeServiceGouvData");
const ListeEtablissementScolaire = require("./models/ListeEtablissementScolaire");
const ListeEtablissementScolaireData = require("./data/ListeEtablissementScolaireData");

//insert matiere primiere into the database
router.post(
  "/insertData",
  AsyncHandler(async (req, res) => {
    await MatierePrimiere.deleteMany({});
    const insertedMatierePrimiere = await MatierePrimiere.insertMany(
      MatierePrimiereData
    );
    res.status(201).json({
      message: "Data inserted successfully",
      data: insertedMatierePrimiere,
    });
  })
);

//insert cacao data into the database
router.post(
  "/insertCacaoData",
  AsyncHandler(async (req, res) => {
    await Cacao.deleteMany({});
    const insertedCacao = await Cacao.insertMany(CacaoData);
    res.status(201).json({
      message: "Cacao data inserted successfully",
      data: insertedCacao,
    });
  })
);

//insert PoissonViande into the database
router.post(
  "/insertPoissonViandeData",
  AsyncHandler(async (req, res) => {
    await PoissonViande.deleteMany({});
    const insertedPoissonViande = await PoissonViande.insertMany(
      PoissonViandeData
    );
    res.status(201).json({
      message: "Poisson et Viande data inserted successfully",
      data: insertedPoissonViande,
    });
  })
);

//insert indicateur into the database
router.post(
  "/insertIndicateurData",
  AsyncHandler(async (req, res) => {
    await Indicateur.deleteMany({});
    const insertedIndicateur = await Indicateur.insertMany(IndicateurData);
    res.status(201).json({
      message: "Indicateur data inserted successfully",
      data: insertedIndicateur,
    });
  })
);

//insert MarcheInternet into the database
router.post(
  "/insertMarcheInternetData",
  AsyncHandler(async (req, res) => {
    await MarcheInternet.deleteMany({});
    const insertedMarcheInternet = await MarcheInternet.insertMany(
      MarcheInternetData
    );
    res.status(201).json({
      message: "Marche Internet data inserted successfully",
      data: insertedMarcheInternet,
    });
  })
);

//insert DisponibiliteInfracture into the database
router.post(
  "/insertDisponibiliteInfractureData",
  AsyncHandler(async (req, res) => {
    await DisponibiliteInfracture.deleteMany({});
    const insertedDisponibiliteInfracture =
      await DisponibiliteInfracture.insertMany(DisponibiliteInfractureData);
    res.status(201).json({
      message: "Disponibilite Infracture data inserted successfully",
      data: insertedDisponibiliteInfracture,
    });
  })
);

//insert EffectifInfraEcole into the database
router.post(
  "/insertEffectifInfraEcoleData",
  AsyncHandler(async (req, res) => {
    await EffectifInfraEcole.deleteMany({});
    const insertedEffectifInfraEcole = await EffectifInfraEcole.insertMany(
      EffectifInfraEcoleData
    );
    res.status(201).json({
      message: "Effectif Infra Ecole data inserted successfully",
      data: insertedEffectifInfraEcole,
    });
  })
);

//insert RepartEleveEnseignantParDrenet into the database
router.post(
  "/insertRepartEleveEnseignantParDrenetData",
  AsyncHandler(async (req, res) => {
    await RepartEleveEnseignantParDrenet.deleteMany({});
    const insertedRepartEleveEnseignantParDrenet =
      await RepartEleveEnseignantParDrenet.insertMany(
        RepartEleveEnseignantParDrenetData
      );
    res.status(201).json({
      message: "Repart Eleve Enseignant Par Drenet data inserted successfully",
      data: insertedRepartEleveEnseignantParDrenet,
    });
  })
);

//insert BillanProgrammeServiceGouv into the database
router.post(
  "/insertBillanProgrammeServiceGouvData",
  AsyncHandler(async (req, res) => {
    await BillanProgrammeServiceGouv.deleteMany({});
    const insertedBillanProgrammeServiceGouv =
      await BillanProgrammeServiceGouv.insertMany(
        BillanProgrammeServiceGouvData
      );
    res.status(201).json({
      message: "Billan Programme Service Gov data inserted successfully",
      data: insertedBillanProgrammeServiceGouv,
    });
  })
);

//insert ListeEtablissementScolaire into the database
router.post(
  "/insertListeEtablissementScolaireData",
  AsyncHandler(async (req, res) => {
    await ListeEtablissementScolaire.deleteMany({});
    const insertedListeEtablissementScolaire =
      await ListeEtablissementScolaire.insertMany(
        ListeEtablissementScolaireData
      );
    res.status(201).json({
      message: "Liste Etablissement Scolaire data inserted successfully",
      data: insertedListeEtablissementScolaire,
    });
  })
);

module.exports = router;
