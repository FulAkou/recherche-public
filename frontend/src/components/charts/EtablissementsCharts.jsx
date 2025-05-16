// import { useEffect, useState } from "react";
// import {
//   Bar,
//   BarChart,
//   Cell,
//   Legend,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { fetchEtablissementsData } from "../../services/api";

// const COLORS = [
//   "#8884d8",
//   "#82ca9d",
//   "#ffc658",
//   "#ff8042",
//   "#0088FE",
//   "#00C49F",
// ];

// const useEtablissementsData = () => {
//   const [data, setData] = useState({
//     chartData: [],
//     loading: true,
//     error: null,
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const chartData = await fetchEtablissementsData();
//         setData({
//           chartData,
//           loading: false,
//           error: null,
//         });
//       } catch (err) {
//         setData({
//           chartData: [],
//           loading: false,
//           error: err.message,
//         });
//       }
//     };

//     loadData();
//   }, []);

//   return { ...data };
// };

// const groupBy = (data, key) => {
//   return data.reduce((acc, curr) => {
//     const value = curr[key];
//     acc[value] = (acc[value] || 0) + 1;
//     return acc;
//   }, {});
// };

// const transformForChart = (obj, keyName = "name", valueName = "count") => {
//   return Object.entries(obj).map(([key, value]) => ({
//     [keyName]: key,
//     [valueName]: value,
//   }));
// };

// const CommuneBarChart = ({ data }) => {
//   const geoCounts = transformForChart(
//     groupBy(data, "situationGeographique"),
//     "commune"
//   );

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">
//         Établissements par Commune
//       </h2>
//       <div className="h-[500px] w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={geoCounts}>
//             <XAxis
//               dataKey="commune"
//               angle={-45}
//               textAnchor="end"
//               height={80}
//               tick={{ fill: "#555" }}
//               axisLine={{ stroke: "#ccc" }}
//             />
//             <YAxis tick={{ fill: "#555" }} axisLine={{ stroke: "#ccc" }} />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "white",
//                 borderRadius: "8px",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 border: "none",
//               }}
//             />
//             <Legend wrapperStyle={{ paddingTop: "20px" }} />
//             <Bar
//               dataKey="count"
//               fill="#ffc658"
//               name="Nombre d'établissements"
//               radius={[4, 4, 0, 0]}
//             >
//               {geoCounts.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// const StatutPieChart = ({ data }) => {
//   const statutCounts = transformForChart(groupBy(data, "statut"), "statut");

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">
//         Répartition par Statut
//       </h2>
//       <div className="h-[400px] w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={statutCounts}
//               dataKey="count"
//               nameKey="statut"
//               cx="50%"
//               cy="50%"
//               outerRadius={120}
//               label={({ name, percent }) =>
//                 `${name}: ${(percent * 100).toFixed(0)}%`
//               }
//               labelLine={false}
//             >
//               {statutCounts.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip
//               formatter={(value, name, props) => [value, props.payload.statut]}
//               contentStyle={{
//                 backgroundColor: "white",
//                 borderRadius: "8px",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 border: "none",
//               }}
//             />
//             <Legend
//               layout="vertical"
//               verticalAlign="middle"
//               align="right"
//               wrapperStyle={{ paddingLeft: "30px" }}
//             />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// const EtablissementsCharts = () => {
//   const { chartData, loading, error } = useEtablissementsData();

//   return (
//     <div className="space-y-8">
//       <h1 className="text-2xl font-bold text-gray-800">
//         Répartition des Établissements Scolaires
//       </h1>

//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg
//                 className="h-5 w-5 text-red-500"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <p className="text-sm text-red-700">Erreur : {error}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {!loading && !error && chartData.length > 0 && (
//         <>
//           <CommuneBarChart data={chartData} />
//           <StatutPieChart data={chartData} />
//         </>
//       )}
//     </div>
//   );
// };

// export default EtablissementsCharts;

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchEtablissementsData } from "../../services/api";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
];

const useEtablissementsData = () => {
  const [data, setData] = useState({
    chartData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const chartData = await fetchEtablissementsData();
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

const groupBy = (data, key) => {
  return data.reduce((acc, curr) => {
    const value = curr[key];
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
};

const transformForChart = (obj, keyName = "name", valueName = "count") => {
  return Object.entries(obj).map(([key, value]) => ({
    [keyName]: key,
    [valueName]: value,
  }));
};

const CommuneBarChart = ({ data }) => {
  const geoCounts = transformForChart(
    groupBy(data, "situationGeographique"),
    "commune"
  ).sort((a, b) => b.count - a.count);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Établissements par Commune
      </h2>
      <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={geoCounts}>
            <XAxis
              dataKey="commune"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: "#555" }}
              axisLine={{ stroke: "#ccc" }}
            />
            <YAxis tick={{ fill: "#555" }} axisLine={{ stroke: "#ccc" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
              formatter={(value) => [`${value} établissements`, "Nombre"]}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar
              dataKey="count"
              fill="#ffc658"
              name="Nombre d'établissements"
              radius={[4, 4, 0, 0]}
            >
              {geoCounts.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatutPieChart = ({ data }) => {
  const statutCounts = transformForChart(groupBy(data, "statut"), "statut");

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Répartition par Statut
      </h2>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statutCounts}
              dataKey="count"
              nameKey="statut"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {statutCounts.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `${value} établissements`,
                props.payload.statut,
              ]}
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
  );
};

const AnalyseSection = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Calcul des statistiques
  const totalEtablissements = data.length;
  const communes = [...new Set(data.map((item) => item.situationGeographique))];
  const statuts = groupBy(data, "statut");

  // Trouver la commune avec le plus d'établissements
  const communesCount = groupBy(data, "situationGeographique");
  const communePlusRepresentee = Object.entries(communesCount).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // Trouver le statut le plus courant
  const statutPlusCourant = Object.entries(statuts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Analyse des Données
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">
            Total établissements
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {totalEtablissements}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">
            Communes couvertes
          </h3>
          <p className="text-3xl font-bold text-green-600">{communes.length}</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">
            Types de statuts
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {Object.keys(statuts).length}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">
            Concentration géographique
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2">
              <span className="font-medium">Commune la plus représentée :</span>{" "}
              {communePlusRepresentee[0]} ({communePlusRepresentee[1]}{" "}
              établissements)
            </p>
            <p>
              <span className="font-medium">
                Part des 3 premières communes :
              </span>{" "}
              {(
                (Object.values(communesCount)
                  .sort((a, b) => b - a)
                  .slice(0, 3)
                  .reduce((a, b) => a + b, 0) /
                  totalEtablissements) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-3">
            Répartition par statut
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2">
              <span className="font-medium">Statut le plus courant :</span>{" "}
              {statutPlusCourant[0]} ({statutPlusCourant[1]} établissements)
            </p>
            <p>
              <span className="font-medium">
                Part des 2 principaux statuts :
              </span>{" "}
              {(
                (Object.values(statuts)
                  .sort((a, b) => b - a)
                  .slice(0, 2)
                  .reduce((a, b) => a + b, 0) /
                  totalEtablissements) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const EtablissementsCharts = () => {
  const { chartData, loading, error } = useEtablissementsData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">
        Répartition des Établissements Scolaires
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
          <CommuneBarChart data={chartData} />
          <StatutPieChart data={chartData} />
          <AnalyseSection data={chartData} />
        </>
      )}
    </div>
  );
};

export default EtablissementsCharts;
