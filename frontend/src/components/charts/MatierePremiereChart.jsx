import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchMatierePremiereData } from "../../services/api";

const useMatierePremiereData = () => {
  const [data, setData] = useState({
    chartData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const chartData = await fetchMatierePremiereData();
        setData({
          chartData,
          loading: false,
          error: null,
        });
      } catch (err) {
        setData({
          chartData: [],
          loading: false,
          error: err.message,
        });
      }
    };

    loadData();
  }, []);

  return { ...data };
};

const couleurs = {
  PRODUCTION: "#8884d8",
  CONSOMMATION: "#82ca9d",
  EXPORTATION: "#ff7300",
};

const AnalyseSection = ({ chartData }) => {
  if (!chartData || chartData.length === 0) return null;

  // Calcul des tendances
  const lastYear = chartData[chartData.length - 1];
  const firstYear = chartData[0];
  const productionTrend =
    ((lastYear.PRODUCTION - firstYear.PRODUCTION) / firstYear.PRODUCTION) * 100;
  const consommationTrend =
    ((lastYear.CONSOMMATION - firstYear.CONSOMMATION) /
      firstYear.CONSOMMATION) *
    100;
  const exportationTrend =
    ((lastYear.EXPORTATION - firstYear.EXPORTATION) / firstYear.EXPORTATION) *
    100;

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-blue-800 mb-6 pb-2">
        Analyse des Données de Matière Première (2003 - 2012)
      </h3>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800">Production</h4>
          <p
            className={`text-lg ${
              productionTrend >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {productionTrend >= 0 ? "↑" : "↓"}{" "}
            {Math.abs(productionTrend).toFixed(1)}%
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-800">Consommation</h4>
          <p
            className={`text-lg ${
              consommationTrend >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {consommationTrend >= 0 ? "↑" : "↓"}{" "}
            {Math.abs(consommationTrend).toFixed(1)}%
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-medium text-orange-800">Exportation</h4>
          <p
            className={`text-lg ${
              exportationTrend >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {exportationTrend >= 0 ? "↑" : "↓"}{" "}
            {Math.abs(exportationTrend).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">Tendance globale :</span> La
          production a {productionTrend >= 0 ? "augmenté" : "diminué"} de{" "}
          {Math.abs(productionTrend).toFixed(1)}% sur la période analysée.
        </p>
        <p>
          <span className="font-semibold">Équilibre marché :</span> Le ratio
          consommation/production est de{" "}
          {((lastYear.CONSOMMATION / lastYear.PRODUCTION) * 100).toFixed(1)}%,
          indiquant{" "}
          {lastYear.CONSOMMATION > lastYear.PRODUCTION
            ? "un déficit"
            : "un excédent"}
          .
        </p>
        <p>
          <span className="font-semibold">Orientation export :</span> Les
          exportations représentent{" "}
          {((lastYear.EXPORTATION / lastYear.PRODUCTION) * 100).toFixed(1)}% de
          la production totale.
        </p>
      </div>
    </div>
  );
};

const MatierePremiereChart = () => {
  const { chartData, loading, error } = useMatierePremiereData();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Comparaison Production / Consommation / Exportation
      </h2>

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

      {!loading && !error && chartData.length === 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Aucune donnée disponible
              </p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && chartData.length > 0 && (
        <>
          <div className="grid md:grid-rows-2 gap-8">
            <div className="h-[400px] w-full">
              <h3 className="text-lg font-semibold mb-2 text-center">
                Évolution temporelle (Lignes)
              </h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="annee" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {["PRODUCTION", "CONSOMMATION", "EXPORTATION"].map((cat) => (
                    <Line
                      key={cat}
                      type="monotone"
                      dataKey={cat}
                      stroke={couleurs[cat]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="h-[400px] w-full mt-4">
              <h3 className="text-lg font-semibold mb-2 text-center">
                Répartition annuelle (Barres)
              </h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="annee" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="PRODUCTION"
                    fill={couleurs.PRODUCTION}
                    name="Production"
                  />
                  <Bar
                    dataKey="CONSOMMATION"
                    fill={couleurs.CONSOMMATION}
                    name="Consommation"
                  />
                  <Bar
                    dataKey="EXPORTATION"
                    fill={couleurs.EXPORTATION}
                    name="Exportation"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <AnalyseSection chartData={chartData} />
          <p className="flex justify-end mt-4 text-sm text-gray-500 text-center">
            Source : Données historiques de la matière première
          </p>
        </>
      )}
    </div>
  );
};

export default MatierePremiereChart;
