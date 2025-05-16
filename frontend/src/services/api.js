import { BACKEND_API_URL } from "./constant";

// Fetch data for Poisson Viande
export const fetchProductionData = async () => {
  const response = await fetch(`${BACKEND_API_URL}/api/poisson-viande`);
  if (!response.ok) throw new Error("Erreur réseau");
  const rawData = await response.json();

  const filtre = rawData.filter(
    (item) =>
      item.categorie === "Production" && item.status === "Quantite en Tonne"
  );

  const regroupement = {};
  const sousCatSet = new Set();

  filtre.forEach(({ annee, sousCategorie, valeur }) => {
    const anneeStr = String(annee);
    sousCatSet.add(sousCategorie);
    if (!regroupement[anneeStr]) {
      regroupement[anneeStr] = { annee: anneeStr };
    }
    regroupement[anneeStr][sousCategorie] = valeur;
  });

  const resultat = Object.values(regroupement).sort(
    (a, b) => a.annee - b.annee
  );

  return { resultat, sousCategories: Array.from(sousCatSet) };
};

// Fetch data for Matiere Premiere
export const fetchMatierePremiereData = async () => {
  const response = await fetch(`${BACKEND_API_URL}/api/matiere-premiere`);
  if (!response.ok) throw new Error("Erreur réseau");
  const rawData = await response.json();

  const filtered = rawData.filter((item) =>
    ["PRODUCTION", "CONSOMMATION", "EXPORTATION"].includes(item.categorie)
  );

  const grouped = {};
  filtered.forEach(({ annee, categorie, valeur }) => {
    if (!grouped[annee]) grouped[annee] = { annee };
    grouped[annee][categorie] = valeur;
  });

  return Object.values(grouped).sort((a, b) => a.annee - b.annee);
};

// Fetch data for Marche Internet
export const fetchMarcheInternetData = async () => {
  const response = await fetch(`${BACKEND_API_URL}/api/marche-internet`);
  if (!response.ok) throw new Error("Erreur réseau");
  const rawData = await response.json();

  const formatData = (data, sousCategorie) => {
    const filtered = data.filter(
      (d) => d.sousCategorie.trim() === sousCategorie.trim()
    );
    const grouped = {};

    filtered.forEach((item) => {
      const { annee, entreprise, valeur } = item;
      if (!grouped[annee]) {
        grouped[annee] = { annee };
      }
      grouped[annee][entreprise] = valeur;
    });

    return Object.values(grouped).sort((a, b) => a.annee - b.annee);
  };

  return {
    internetFixeData: formatData(rawData, "Internet fixe"),
    internetMobileData: formatData(rawData, "Internet mobile"),
  };
};

// Fetch data for Cacao
export const fetchCacaoData = async () => {
  const response = await fetch(`${BACKEND_API_URL}/api/cacao`);
  if (!response.ok) throw new Error("Erreur réseau");
  return await response.json();
};

// Fetch data for Etablissements
export const fetchEtablissementsData = async () => {
  const response = await fetch(
    `${BACKEND_API_URL}/api/liste-etablissement-scolaire`
  );
  if (!response.ok) throw new Error("Erreur réseau");
  return await response.json();
};

// Fetch data for Effectif des infrastructures
export const fetchEffectifData = async () => {
  const response = await fetch(
    `${BACKEND_API_URL}/api/effectif-infrastructures`
  );
  if (!response.ok)
    throw new Error("Erreur lors de la récupération des données");
  return await response.json();
};

// Fetch data for Disponibilité des infrastructures
export const fetchDisponibiliteData = async () => {
  const response = await fetch(
    `${BACKEND_API_URL}/api/disponibilite-infractuture`
  );
  if (!response.ok) throw new Error("Erreur réseau");
  return await response.json();
};

// Fetch data for Indicateurs
export const fetchIndicateurData = async () => {
  const response = await fetch(`${BACKEND_API_URL}/api/indicateur`);
  if (!response.ok)
    throw new Error("Erreur lors de la récupération des données");
  return await response.json();
};

// Fetch data for Bilan Programme
export const fetchBilanProgrammeData = async () => {
  const response = await fetch(
    `${BACKEND_API_URL}/api/bilan-programme-service-gouv`
  );
  if (!response.ok) throw new Error("Erreur réseau ou serveur");
  return await response.json();
};

// Fetch data for Effectif des services
export const fetchEffectifServicesData = async () => {
  const response = await fetch(`${BACKEND_API_URL}/api/effectif-hopitaux`);
  if (!response.ok) throw new Error("Erreur réseau ou serveur");
  return await response.json();
};

// Fetch data for Effectif des services
export const fetchCovidData = async () => {
  const response = await fetch(`${BACKEND_API_URL}/api/covid19statistiques`);
  if (!response.ok) throw new Error("Erreur réseau ou serveur");
  return await response.json();
};

// Fetch data for Effectif des services
export const fetchAccidentsTravailData = async () => {
  const response = await fetch(`${BACKEND_API_URL}/api/accident-travail`);
  if (!response.ok) throw new Error("Erreur réseau ou serveur");
  return await response.json();
};

export const fetchAccidentsRouteData = async () => {
  const response = await fetch(`${BACKEND_API_URL}/api/accident-de-route`);
  if (!response.ok) throw new Error("Erreur réseau ou serveur");
  return await response.json();
};
