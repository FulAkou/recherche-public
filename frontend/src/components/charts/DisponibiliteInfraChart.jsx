import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchDisponibiliteData } from "../../services/api";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const useDisponibiliteData = () => {
  const [data, setData] = useState({
    chartData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const rawData = await fetchDisponibiliteData();
        const transformedData = transformData(rawData);
        setData({
          chartData: transformedData,
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

const transformData = (data) => {
  const grouped = {};

  data.forEach(({ dren, statut, effectif }) => {
    if (!grouped[dren]) {
      grouped[dren] = { dren, PUBLIC: 0, PRIVE: 0, COMMUNAUTAIRE: 0 };
    }
    grouped[dren][statut] = effectif;
  });

  return Object.values(grouped);
};

const StatsSummary = ({ chartData }) => {
  const totalPublic = chartData.reduce((sum, d) => sum + (d.PUBLIC || 0), 0);
  const totalPrive = chartData.reduce((sum, d) => sum + (d.PRIVE || 0), 0);
  const totalCommunautaire = chartData.reduce(
    (sum, d) => sum + (d.COMMUNAUTAIRE || 0),
    0
  );
  const total = totalPublic + totalPrive + totalCommunautaire;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 mt-8">
      <h2 className="text-xl font-bold text-center text-gray-800">
        Statistiques globales des établissements scolaires
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600">Total</h3>
          <p className="text-2xl font-bold text-blue-600">{total}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600">Public</h3>
          <p className="text-xl font-semibold text-indigo-600">{totalPublic}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600">Privé</h3>
          <p className="text-xl font-semibold text-green-600">{totalPrive}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600">Communautaire</h3>
          <p className="text-xl font-semibold text-yellow-600">
            {totalCommunautaire}
          </p>
        </div>
      </div>

      <div className="text-sm text-gray-600 mt-4">
        <p className="mb-2">
          <span className="font-semibold">Description du graphique :</span> Le
          premier graphique présente la disponibilité des écoles par DREN
          (Direction Régionale de l'Éducation Nationale) en distinguant trois
          statuts :<span className="text-indigo-600 font-medium"> Public</span>,
          <span className="text-green-600 font-medium"> Privé</span> et
          <span className="text-yellow-600 font-medium"> Communautaire</span>.
        </p>
        <p>
          Le second graphique met en évidence la répartition globale des écoles
          par statut, permettant une vision synthétique du paysage scolaire
          couvert par la base de données.
        </p>
      </div>

      <p className="text-xs text-right text-gray-400 italic">
        Source : Ministère de l'Enseignement Supérieur et de la Recherche
        Scientifique
      </p>
    </div>
  );
};

const DisponibiliteInfraChart = () => {
  const { chartData, loading, error } = useDisponibiliteData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">
        Disponibilité des Infrastructures Scolaires
      </h1>

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

      {!loading && !error && chartData.length > 0 && (
        <>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Disponibilité des écoles par DREN et Statut
            </h3>
            <div className="h-[500px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis
                    dataKey="dren"
                    className="text-xs"
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
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Bar
                    dataKey="PUBLIC"
                    fill="#8884d8"
                    name="Public"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="PRIVE"
                    fill="#82ca9d"
                    name="Privé"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="COMMUNAUTAIRE"
                    fill="#ffc658"
                    name="Communautaire"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Répartition globale des écoles par Statut
            </h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Public",
                        value: chartData.reduce(
                          (sum, d) => sum + (d.PUBLIC || 0),
                          0
                        ),
                      },
                      {
                        name: "Privé",
                        value: chartData.reduce(
                          (sum, d) => sum + (d.PRIVE || 0),
                          0
                        ),
                      },
                      {
                        name: "Communautaire",
                        value: chartData.reduce(
                          (sum, d) => sum + (d.COMMUNAUTAIRE || 0),
                          0
                        ),
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                    dataKey="value"
                  >
                    <Cell fill="#8884d8" />
                    <Cell fill="#82ca9d" />
                    <Cell fill="#ffc658" />
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [value, name]}
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ paddingLeft: "30px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <StatsSummary chartData={chartData} />
        </>
      )}
    </div>
  );
};

export default DisponibiliteInfraChart;
