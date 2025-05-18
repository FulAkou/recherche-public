// import { useEffect, useState } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { fetchAccidentsRouteData } from "../../services/api";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// const SecteurAccidentsRouteChart = () => {
//   const [data, setData] = useState({
//     rawData: [],
//     loading: true,
//     error: null,
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setData((prev) => ({ ...prev, loading: true }));

//         // Ajout de await ici
//         const responseData = await fetchAccidentsRouteData();

//         setData({
//           rawData: responseData || [], // Protection contre les données nulles
//           loading: false,
//           error: null,
//         });
//       } catch (err) {
//         setData({
//           rawData: [],
//           loading: false,
//           error: err.message || "Erreur lors du chargement des données",
//         });
//       }
//     };

//     loadData();
//   }, []);

//   const prepareChartData = () => {
//     return (data.rawData || [])
//       .map((item) => ({
//         ...item,
//         Effectif: Number(item.Effectif) || 0,
//         Annee: Number(item.Annee) || 0, // Conversion de l'année en nombre
//       }))
//       .sort((a, b) => a.Annee - b.Annee);
//   };

//   const chartData = prepareChartData();

//   // Debug: afficher les données dans la console
//   console.log("Données préparées:", chartData);

//   return (
//     <div className="w-full bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">
//         Évolution des accidents de la route
//       </h2>
//       <p className="text-gray-600 mb-6">
//         Nombre d'accidents de la route par année (2000-2020)
//       </p>

//       {data.loading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       )}

//       {data.error && (
//         <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
//           <p className="text-sm text-red-700">Erreur : {data.error}</p>
//         </div>
//       )}

//       {!data.loading && !data.error && (
//         <>
//           {chartData.length > 0 ? (
//             <div className="h-[500px] w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={chartData}
//                   margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//                   <XAxis
//                     dataKey="Annee"
//                     label={{ value: "Année", position: "bottom", offset: 15 }}
//                   />
//                   <YAxis
//                     label={{
//                       value: "Nombre d'accidents",
//                       angle: -90,
//                       position: "left",
//                       offset: 10,
//                     }}
//                   />
//                   <Tooltip
//                     formatter={(value) => [`${value} accidents`, "Nombre"]}
//                     labelFormatter={(label) => `Année: ${label}`}
//                   />
//                   <Legend />
//                   <Bar
//                     dataKey="Effectif"
//                     name="Accidents de la route"
//                     barSize={30}
//                   >
//                     {chartData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           ) : (
//             <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
//               <p className="text-gray-500">
//                 Aucune donnée disponible pour la période sélectionnée
//               </p>
//             </div>
//           )}
//         </>
//       )}

//       <p className="mt-6 text-sm text-gray-400 text-right">
//         Source: Statistiques des accidents de la route -{" "}
//         {new Date().getFullYear()}
//       </p>
//     </div>
//   );
// };

// export default SecteurAccidentsRouteChart;

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchAccidentsRouteData } from "../../services/api";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const SecteurAccidentsRouteChart = () => {
  const [data, setData] = useState({
    rawData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setData((prev) => ({ ...prev, loading: true }));
        const responseData = await fetchAccidentsRouteData();
        setData({
          rawData: responseData || [],
          loading: false,
          error: null,
        });
      } catch (err) {
        setData({
          rawData: [],
          loading: false,
          error: err.message || "Erreur lors du chargement des données",
        });
      }
    };

    loadData();
  }, []);

  const prepareChartData = () => {
    return (data.rawData || [])
      .map((item) => ({
        ...item,
        Effectif: Number(item.Effectif) || 0,
        Annee: Number(item.Annee) || 0,
      }))
      .sort((a, b) => a.Annee - b.Annee);
  };

  const chartData = prepareChartData();

  // Calcul des statistiques
  const calculateStats = () => {
    if (chartData.length === 0) return null;

    const totalAccidents = chartData.reduce(
      (sum, item) => sum + item.Effectif,
      0
    );
    const average = totalAccidents / chartData.length;
    const maxYear = chartData.reduce((max, item) =>
      item.Effectif > max.Effectif ? item : max
    );
    const minYear = chartData.reduce((min, item) =>
      item.Effectif < min.Effectif ? item : min
    );

    // Calcul de l'évolution sur 5 ans
    let evolution = 0;
    if (chartData.length >= 5) {
      const recent = chartData.slice(-5);
      const first = recent[0].Effectif;
      const last = recent[recent.length - 1].Effectif;
      evolution = first !== 0 ? ((last - first) / first) * 100 : 0;
    }

    return {
      totalAccidents,
      average: Math.round(average),
      maxYear,
      minYear,
      evolution,
    };
  };

  const stats = calculateStats();

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Évolution des accidents de la route
      </h2>
      <p className="text-gray-600 mb-6">
        Nombre d'accidents de la route par année (2000-2020)
      </p>

      {data.loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {data.error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-red-700">Erreur : {data.error}</p>
        </div>
      )}

      {!data.loading && !data.error && (
        <>
          {chartData.length > 0 ? (
            <>
              <div className="grid md:grid-rows-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Données annuelles
                  </h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis
                          dataKey="Annee"
                          label={{
                            position: "bottom",
                            offset: 15,
                          }}
                        />
                        <YAxis
                          label={{
                            angle: -90,
                            position: "left",
                            offset: 10,
                          }}
                        />
                        <Tooltip
                          formatter={(value) => [
                            `${value} accidents`,
                            "Nombre",
                          ]}
                          labelFormatter={(label) => `Année: ${label}`}
                        />
                        <Legend />
                        <Bar
                          dataKey="Effectif"
                          name="Accidents de la route"
                          barSize={30}
                        >
                          {chartData.map((entry, index) => (
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

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Tendance d'évolution
                  </h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="Annee" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [
                            `${value} accidents`,
                            "Nombre",
                          ]}
                          labelFormatter={(label) => `Année: ${label}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="Effectif"
                          stroke="#8884d8"
                          strokeWidth={2}
                          name="Accidents de la route"
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {stats && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Analyse des données
                  </h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Total d'accidents
                      </h4>
                      <p className="text-2xl font-bold text-blue-600">
                        {stats.totalAccidents.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        sur {chartData.length} années
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Moyenne annuelle
                      </h4>
                      <p className="text-2xl font-bold text-green-600">
                        {stats.average.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        accidents par an
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Année record
                      </h4>
                      <p className="text-xl font-bold text-purple-600">
                        {stats.maxYear.Annee}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {stats.maxYear.Effectif.toLocaleString()} accidents
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Évolution (5 ans)
                      </h4>
                      <p
                        className={`text-2xl font-bold ${
                          stats.evolution >= 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {stats.evolution >= 0 ? "+" : ""}
                        {stats.evolution.toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        sur les 5 dernières années
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                Aucune donnée disponible pour la période sélectionnée
              </p>
            </div>
          )}
        </>
      )}

      <p className="mt-6 text-sm text-gray-400 text-right">
        Source: Statistiques des accidents de la route -{" "}
        {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default SecteurAccidentsRouteChart;
