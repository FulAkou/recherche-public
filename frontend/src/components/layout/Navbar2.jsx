const Navbar2 = ({
  activeChart,
  setActiveChart,
  domaineActif,
  setDomaineActif,
}) => {
  const educationNavlinks = [
    { label: "Etablissements", key: "Etablissement" },
    {
      label: "Bilan programme service gouv",
      key: "Bilan Programme Service Gouv",
    },
    { label: "Effectif des ecoles par ville", key: "Effectif des ecoles" },
    {
      label: "Disponibilite des infrastructures",
      key: "disponibilite des infrastructures",
    },
  ];
  const economieNavlinks = [
    { label: "Production poisson et viande", key: "production" },
    { label: "Matières premières", key: "matiere" },

    { label: "Consommation engrais", key: "Consommation engraisse" },
    { label: "Marché Internet", key: "internet" },
    { label: "Production cacao", key: "Production Cacao" },
  ];

  const santeNavLinks = [
    { label: "Hôpitaux généraux", key: "Hopitaux Generaux" },
    { label: "Covid-19 stastiques", key: "Covid Correlation" },
    { label: "Secteur accident de travail", key: "Accident de Travail" },
    { label: "Secteur accident de route", key: "Accident de Route" },
  ];

  const domaines = [
    { label: "Economie", key: "Economie" },
    { label: "Education", key: "Education" },
    { label: "Sante", key: "Sante" },
  ];

  // Sélection dynamique des liens selon le domaine actif
  let navLinks = [];
  if (domaineActif === "Economie") navLinks = economieNavlinks;
  else if (domaineActif === "Sante") navLinks = santeNavLinks;
  else navLinks = educationNavlinks;

  return (
    <div>
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-around items-center gap-10 mt-28 pb-4">
        {domaines.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setDomaineActif(btn.key)}
            className={`px-4 py-2 rounded-lg transition hover:bg-blue-300 hover:text-white  ${
              domaineActif === btn.key
                ? "bg-blue-500 hover:bg-blue-400 text-white "
                : " bg-white text-blue-600 font-semibold "
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <nav className="w-full container mx-auto p-3 bg-[#6B31C0]/30 border-gray-300 text-white shadow-lg">
        <div className="w-full px-4 py-3 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row md:items-center w-full gap-4">
            <div className="w-full flex flex-wrap gap-2 overflow-x-auto justify-center md:justify-start">
              <label className="text-black rounded-md px-3 py-1 text-2xs w-full sm:w-auto">
                Sources :
              </label>
              <select
                value={activeChart}
                onChange={(e) => setActiveChart(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg transition text-black"
              >
                {navLinks.map((btn) => (
                  <option key={btn.key} value={btn.key}>
                    {btn.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar2;
