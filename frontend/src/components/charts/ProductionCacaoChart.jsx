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
import { fetchCacaoData } from "../../services/api";

const useCacaoData = () => {
  const [data, setData] = useState({
    cacaoData: [],
    loading: true,
    error: null,
    anneeDebut: null,
    anneeFin: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const cacaoData = await fetchCacaoData();
        const annees = cacaoData.map((d) => d.annee);
        setData({
          cacaoData,
          loading: false,
          error: null,
          anneeDebut: Math.min(...annees),
          anneeFin: Math.max(...annees),
        });
      } catch (err) {
        setData({
          cacaoData: [],
          loading: false,
          error: err.message,
          anneeDebut: null,
          anneeFin: null,
        });
      }
    };

    loadData();
  }, []);

  return { ...data, setData };
};

const YearSelectors = ({
  anneesDisponibles,
  anneeDebut,
  anneeFin,
  onYearChange,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <label className="text-sm text-gray-700">De :</label>
      <select
        className="border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={anneeDebut}
        onChange={(e) => onYearChange("anneeDebut", parseInt(e.target.value))}
      >
        {anneesDisponibles.map((annee) => (
          <option key={`start-${annee}`} value={annee}>
            {annee}
          </option>
        ))}
      </select>
      <label className="text-sm text-gray-700">à</label>
      <select
        className="border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={anneeFin}
        onChange={(e) => onYearChange("anneeFin", parseInt(e.target.value))}
      >
        {anneesDisponibles.map((annee) => (
          <option key={`end-${annee}`} value={annee}>
            {annee}
          </option>
        ))}
      </select>
    </div>
  );
};

const ProductionCacaoChart = () => {
  const { cacaoData, loading, error, anneeDebut, anneeFin, setData } =
    useCacaoData();

  const anneesDisponibles = [
    ...new Set(cacaoData.map((item) => item.annee)),
  ].sort((a, b) => a - b);
  const dataFiltrée = cacaoData.filter(
    (item) => item.annee >= anneeDebut && item.annee <= anneeFin
  );

  const handleYearChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Évolution de la production et du prix du cacao
        </h2>

        {!loading && !error && (
          <YearSelectors
            anneesDisponibles={anneesDisponibles}
            anneeDebut={anneeDebut}
            anneeFin={anneeFin}
            onYearChange={handleYearChange}
          />
        )}
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Erreur : {error}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && dataFiltrée.length > 0 && (
        <>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dataFiltrée}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis
                  dataKey="annee"
                  tick={{ fill: "#555" }}
                  axisLine={{ stroke: "#ccc" }}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tick={{ fill: "#555" }}
                  axisLine={{ stroke: "#ccc" }}
                  label={{
                    value: "Tonnes",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#555",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "#555" }}
                  axisLine={{ stroke: "#ccc" }}
                  label={{
                    value: "FCFA/kg",
                    angle: -90,
                    position: "insideRight",
                    fill: "#555",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="productionTonnes"
                  stroke="#10b981"
                  name="Production (tonnes)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="prixProductionFCFAkg"
                  stroke="#3b82f6"
                  name="Prix (FCFA/kg)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Source : Données historiques de la filière cacao
          </p>
        </>
      )}
    </div>
  );
};

export default ProductionCacaoChart;
