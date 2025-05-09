import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Home = () => {
  // États pour la gestion de la recherche
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const searchData = [
    "React - Une bibliothèque JavaScript pour créer des interfaces utilisateur",
    "Vue.js - Framework progressif pour construire des interfaces",
    "Angular - Plateforme de développement pour créer des applications web",
    "Node.js - Environnement d'exécution JavaScript côté serveur",
    "JavaScript - Langage de programmation pour le web",
    "Python - Langage polyvalent pour l'IA, le web et plus",
    "Django - Framework Python pour des applications web rapides",
    "Machine Learning - Techniques d'apprentissage automatique",
    "OpenAI - Recherche et outils d'intelligence artificielle",
    "GitHub - Plateforme d’hébergement de code et de collaboration",
  ];

  // Données fictives pour le graphique
  const chartData = [
    { name: "React", value: 80 },
    { name: "Vue.js", value: 60 },
    { name: "Angular", value: 70 },
    { name: "Node.js", value: 75 },
    { name: "JavaScript", value: 90 },
    { name: "Python", value: 95 },
    { name: "Django", value: 65 },
    { name: "Machine Learning", value: 85 },
    { name: "OpenAI", value: 88 },
    { name: "GitHub", value: 92 },
  ];

  // Hook qui met à jour les suggestions à chaque modification de la requête de recherche
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = searchData.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions(filtered.slice(0, 5));
    }
  }, [query]);

  // Fonction qui déclenche la recherche et le chargement des résultats
  const handleSearch = () => {
    setLoading(true);
    setResults([]);
    setSuggestions([]); // Effacer les suggestions lors de la recherche

    setTimeout(() => {
      if (query.trim()) {
        const filteredResults = searchData.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
      }
      setLoading(false);
    }, 1500);
  };

  // Fonction appelée lorsque l'utilisateur clique sur une suggestion
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion); // Mettre la suggestion dans la barre de recherche
    setSuggestions([]); // Effacer les suggestions
    handleSearch(); // Lancer la recherche avec la suggestion sélectionnée
  };

  return (
    <div>
      <div>
        {/* Titre principal */}
        <h1 className="text-5xl font-bold text-center mt-10 pb-10 text-blue-500">
          Welcome to <span>Inova</span> <span>Vizualization</span>
        </h1>
      </div>

      {/* Barre de recherche */}
      <div className="flex justify-center items-center h-screen bg-gray-100 gap-2">
        <div className="border-2 border-blue-500 w-1/2 h-full rounded-md m-auto p-4 relative">
          <div className="flex items-center border-2 border-blue-500 rounded-full mt-3 bg-white overflow-hidden shadow-lg">
            {/* Champ de texte pour saisir la recherche */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Mettre à jour la requête de recherche
              className="w-full py-4 px-4 text-gray-700 focus:outline-none"
              placeholder="Que recherchez-vous ?"
              disabled={loading} // Désactiver l'input quand la recherche est en cours
            />

            {/* Bouton de recherche */}
            <button
              onClick={handleSearch} // Lancer la recherche lors du clic
              disabled={loading || query.trim() === ""} // Désactiver le bouton pendant le chargement
              className={`bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-6 py-4 ${
                loading || query.trim() === ""
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              {/* Afficher un spinner pendant le chargement */}
              {loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-spin"
                >
                  <path d="M12 2v4" />
                  <path d="m16.2 7.8 2.9-2.9" />
                  <path d="M18 12h4" />
                  <path d="m16.2 16.2 2.9 2.9" />
                  <path d="M12 18v4" />
                  <path d="m4.9 19.1 2.9-2.9" />
                  <path d="M2 12h4" />
                  <path d="m4.9 4.9 2.9 2.9" />
                </svg>
              ) : (
                "Rechercher"
              )}
            </button>
          </div>
          {/* Suggestions de recherche (s'affichent si la requête n'est pas vide) */}
          {suggestions.length > 0 && !loading && (
            <div className=" z-10 w-full bg-white mt-1 rounded-lg shadow-lg border">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)} // Sélectionner une suggestion
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          {/* Résultats de recherche */}
          <div className="mt-6 space-y-4 min-h-[200px] relative">
            {/* Afficher un loader global pendant la recherche */}
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80 z-20 rounded-lg">
                <div className="text-blue-500 animate-spin">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v4" />
                    <path d="m16.2 7.8 2.9-2.9" />
                    <path d="M18 12h4" />
                    <path d="m16.2 16.2 2.9 2.9" />
                    <path d="M12 18v4" />
                    <path d="m4.9 19.1 2.9-2.9" />
                    <path d="M2 12h4" />
                    <path d="m4.9 4.9 2.9 2.9" />
                  </svg>
                </div>
              </div>
            )}

            {/* Afficher les résultats après le chargement */}
            {!loading &&
              results.map((result, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-500"
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    {result}
                  </h2>
                </div>
              ))}
            <div>
              <h1 className="text-5xl text-blue-500 font-bold text-center mt-2 pb-10">
                Vizualization
              </h1>
              <div style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer>
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
