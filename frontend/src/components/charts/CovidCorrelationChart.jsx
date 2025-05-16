import { useState } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { useCovidData } from "../../hooks/useCovidData";

const VAR_OPTIONS = [
  { value: "personnesVaccineesPourCent", label: "Vaccination (%)" },
  { value: "tauxPositivite", label: "Taux de positivité" },
  { value: "pauvreteExtremepourcent", label: "Pauvreté extrême (%)" },
  { value: "totalCasParMillion", label: "Cas par million" },
  { value: "totalDecesParMillion", label: "Décès par million" },
  { value: "pibParHabitant", label: "PIB par habitant" },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const CovidCorrelationChart = () => {
  const { rawData, loading, error } = useCovidData();
  const [xVar, setXVar] = useState("personnesVaccineesPourCent");
  const [yVar, setYVar] = useState("totalDecesParMillion");
  const [sizeVar, setSizeVar] = useState("Population");

  // Préparer les données pour le scatter plot
  const prepareChartData = () => {
    return rawData
      .filter((item) => item[xVar] !== null && item[yVar] !== null)
      .map((item) => ({
        ...item,
        // Convertir les dates en format lisible
        dateFormatted: new Date(item.Date).toLocaleDateString(),
      }));
  };

  const chartData = prepareChartData();

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Corrélations entre indicateurs COVID
      </h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Axe X</label>
          <select
            value={xVar}
            onChange={(e) => setXVar(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white"
          >
            {VAR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Axe Y</label>
          <select
            value={yVar}
            onChange={(e) => setYVar(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white"
          >
            {VAR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">
            Taille des points
          </label>
          <select
            value={sizeVar}
            onChange={(e) => setSizeVar(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white"
          >
            <option value="Population">Population</option>
            <option value="totalCas">Cas totaux</option>
            <option value="totalTestsRealise">Tests totaux</option>
          </select>
        </div>
      </div>

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
        <div className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={xVar}
                name={VAR_OPTIONS.find((o) => o.value === xVar)?.label || xVar}
                label={{
                  value:
                    VAR_OPTIONS.find((o) => o.value === xVar)?.label || xVar,
                  position: "bottom",
                }}
              />
              <YAxis
                dataKey={yVar}
                name={VAR_OPTIONS.find((o) => o.value === yVar)?.label || yVar}
                label={{
                  value:
                    VAR_OPTIONS.find((o) => o.value === yVar)?.label || yVar,
                  angle: -90,
                  position: "left",
                }}
              />
              <ZAxis dataKey={sizeVar} range={[50, 500]} name="Taille" />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "dateFormatted") return [value, "Date"];
                  if (name === "paysOuRegion") return [value, "Pays"];
                  return [Number(value).toLocaleString(), name];
                }}
              />
              <Legend />
              <Scatter name="Pays" data={chartData}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}

      <p className="mt-6 text-sm text-gray-400 text-right">
        Source: Données COVID-19 mondiales
      </p>
    </div>
  );
};

export default CovidCorrelationChart;
