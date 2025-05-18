import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchIndicateurData } from "../../services/api";

const useConsommationData = () => {
  const [data, setData] = useState({
    donneesEngrais: [],
    loading: true,
    error: null,
    anneeDebut: 1982,
    anneeFin: 1996,
    indicateur: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const donneesEngrais = await fetchIndicateurData();
        setData((prev) => ({
          ...prev,
          donneesEngrais,
          loading: false,
        }));
      } catch (err) {
        setData((prev) => ({
          ...prev,
          error: err.message || "Erreur lors du chargement",
          loading: false,
        }));
      }
    };

    loadData();
  }, []);

  return { ...data, setData };
};

const ConsommationEngraisChart = () => {
  const {
    donneesEngrais,
    loading,
    error,
    anneeDebut,
    anneeFin,
    indicateur,
    setData,
  } = useConsommationData();

  const handleFilterChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleYearValidation = () => {
    if (anneeDebut > anneeFin) {
      setData((prev) => ({
        ...prev,
        anneeDebut: Math.min(anneeDebut, anneeFin),
        anneeFin: Math.max(anneeDebut, anneeFin),
      }));
    }
  };

  const filteredData = donneesEngrais.filter((item) => {
    const yearFilter = item.annee >= anneeDebut && item.annee <= anneeFin;
    const indicatorFilter = indicateur ? item.indicateur === indicateur : true;
    return yearFilter && indicatorFilter;
  });

  const years = donneesEngrais.map((item) => item.annee);
  const minYear = years.length > 0 ? Math.min(...years) : 1980;
  const maxYear = years.length > 0 ? Math.max(...years) : 2025;

  const indicateurs = [
    ...new Set(donneesEngrais.map((item) => item.indicateur)),
  ];

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Consommation d'engrais (kg/ha) par an
      </h2>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-red-700">Erreur : {error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Période
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={anneeDebut}
                  onChange={(e) =>
                    handleFilterChange("anneeDebut", Number(e.target.value))
                  }
                  onBlur={handleYearValidation}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={minYear}
                  max={maxYear}
                />
                <span>à</span>
                <input
                  type="number"
                  value={anneeFin}
                  onChange={(e) =>
                    handleFilterChange("anneeFin", Number(e.target.value))
                  }
                  onBlur={handleYearValidation}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={minYear}
                  max={maxYear}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Indicateur
              </label>
              <select
                onChange={(e) =>
                  handleFilterChange("indicateur", e.target.value)
                }
                value={indicateur}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tous les indicateurs</option>
                {indicateurs.map((indic, index) => (
                  <option key={index} value={indic}>
                    {indic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-[500px] w-full">
            {filteredData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis
                    dataKey="annee"
                    angle={-30}
                    textAnchor="end"
                    interval={4}
                    height={80}
                    tick={{ fill: "#555" }}
                    axisLine={{ stroke: "#ccc" }}
                  />
                  <YAxis
                    tick={{ fill: "#555" }}
                    axisLine={{ stroke: "#ccc" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  />
                  <Bar
                    dataKey="valeur"
                    fill="#10b981"
                    name="kg/ha"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Aucune donnée disponible pour les filtres sélectionnés
                </p>
              </div>
            )}
          </div>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Source : Données agriculture (Banque mondiale, etc.)
          </p>
        </>
      )}
    </div>
  );
};

export default ConsommationEngraisChart;
