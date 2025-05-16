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
// import { fetchAccidentsTravailData } from "../../services/api";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// const SecteurAccidentsTravailChart = () => {
//   const [data, setData] = useState({
//     rawData: [],
//     loading: true,
//     error: null,
//   });

//   const [selectedSector, setSelectedSector] = useState("Activités maritimes");

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setData((prev) => ({ ...prev, loading: true }));

//         // Appel API correct avec await
//         const rawData = await fetchAccidentsTravailData();

//         setData({
//           rawData: rawData || [], // Assure un tableau vide si rawData est null/undefined
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
//       .filter((item) => item.sousCategorie === selectedSector)
//       .map((item) => ({
//         ...item,
//         // Conversion en nombre au cas où
//         nombreDaccidentsAuTravail: Number(item.nombreDaccidentsAuTravail) || 0,
//       }))
//       .sort((a, b) => a.annee - b.annee);
//   };

//   const chartData = prepareChartData();
//   const sectors = [...new Set(data.rawData.map((item) => item.sousCategorie))];

//   // Debug: vérifiez les données dans la console
//   console.log("Données préparées:", chartData);

//   return (
//     <div className="w-full bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">
//         Accidents du travail par secteur d'activité
//       </h2>
//       <p className="text-gray-600 mb-6">
//         Évolution du nombre d'accidents du travail par année et par secteur.
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
//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-1">
//               Secteur d'activité
//             </label>
//             <select
//               value={selectedSector}
//               onChange={(e) => setSelectedSector(e.target.value)}
//               className="w-full max-w-md border rounded px-3 py-2 bg-white"
//             >
//               {sectors.map((sector) => (
//                 <option key={sector} value={sector}>
//                   {sector}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {chartData.length > 0 ? (
//             <div className="h-[500px] w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={chartData}
//                   margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//                   <XAxis
//                     dataKey="annee"
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
//                     dataKey="nombreDaccidentsAuTravail"
//                     name="Accidents du travail"
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
//                 Aucune donnée disponible pour ce secteur
//               </p>
//             </div>
//           )}
//         </>
//       )}

//       <p className="mt-6 text-sm text-gray-400 text-right">
//         Source: Données des accidents du travail - {new Date().getFullYear()}
//       </p>
//     </div>
//   );
// };

// export default SecteurAccidentsTravailChart;

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
import { fetchAccidentsTravailData } from "../../services/api";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const SecteurAccidentsTravailChart = () => {
  const [data, setData] = useState({
    rawData: [],
    loading: true,
    error: null,
  });

  const [selectedSector, setSelectedSector] = useState("Activités maritimes");

  useEffect(() => {
    const loadData = async () => {
      try {
        setData((prev) => ({ ...prev, loading: true }));
        const rawData = await fetchAccidentsTravailData();
        setData({
          rawData: rawData || [],
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
      .filter((item) => item.sousCategorie === selectedSector)
      .map((item) => ({
        ...item,
        nombreDaccidentsAuTravail: Number(item.nombreDaccidentsAuTravail) || 0,
      }))
      .sort((a, b) => a.annee - b.annee);
  };

  const prepareAllSectorsData = () => {
    const years = [...new Set(data.rawData.map((item) => item.annee))].sort();
    const sectors = [
      ...new Set(data.rawData.map((item) => item.sousCategorie)),
    ];

    return years.map((year) => {
      const yearData = { annee: year };
      sectors.forEach((sector) => {
        const item = data.rawData.find(
          (d) => d.annee === year && d.sousCategorie === sector
        );
        yearData[sector] = item
          ? Number(item.nombreDaccidentsAuTravail) || 0
          : 0;
      });
      return yearData;
    });
  };

  const chartData = prepareChartData();
  const allSectorsData = prepareAllSectorsData();
  const sectors = [...new Set(data.rawData.map((item) => item.sousCategorie))];

  // Analyse des données
  const calculateStats = () => {
    if (chartData.length === 0) return null;

    const currentData = chartData;
    const totalAccidents = currentData.reduce(
      (sum, item) => sum + item.nombreDaccidentsAuTravail,
      0
    );
    const average = totalAccidents / currentData.length;
    const maxYear = currentData.reduce((max, item) =>
      item.nombreDaccidentsAuTravail > max.nombreDaccidentsAuTravail
        ? item
        : max
    );
    const minYear = currentData.reduce((min, item) =>
      item.nombreDaccidentsAuTravail < min.nombreDaccidentsAuTravail
        ? item
        : min
    );

    // Calcul de l'évolution
    let evolution = 0;
    if (currentData.length > 1) {
      const last =
        currentData[currentData.length - 1].nombreDaccidentsAuTravail;
      const prev =
        currentData[currentData.length - 2].nombreDaccidentsAuTravail;
      evolution = prev !== 0 ? ((last - prev) / prev) * 100 : 0;
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
    <div className="w-full bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Accidents du travail par secteur d'activité
      </h2>
      <p className="text-gray-600 mb-6">
        Évolution du nombre d'accidents du travail par année et par secteur.
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
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Secteur d'activité
            </label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full max-w-md border rounded px-3 py-2 bg-white"
            >
              {sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>

          {chartData.length > 0 ? (
            <>
              <div className="grid md:grid-rows-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Données par année ({selectedSector})
                  </h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis
                          dataKey="annee"
                          label={{
                            value: "Année",
                            position: "bottom",
                            offset: 15,
                          }}
                        />
                        <YAxis
                          label={{
                            value: "Nombre d'accidents",
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
                          dataKey="nombreDaccidentsAuTravail"
                          name="Accidents du travail"
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
                    Comparaison des secteurs
                  </h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={allSectorsData}
                        margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="annee" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [
                            `${value} accidents`,
                            name,
                          ]}
                          labelFormatter={(label) => `Année: ${label}`}
                        />
                        <Legend />
                        {sectors.map((sector, index) => (
                          <Line
                            key={sector}
                            type="monotone"
                            dataKey={sector}
                            stroke={COLORS[index % COLORS.length]}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {stats && (
                <div className="bg-gray-50 rounded-xl p-6 mt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Analyse du secteur: {selectedSector}
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
                        {stats.maxYear.annee}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {stats.maxYear.nombreDaccidentsAuTravail.toLocaleString()}{" "}
                        accidents
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Évolution récente
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
                        par rapport à l'année précédente
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                Aucune donnée disponible pour ce secteur
              </p>
            </div>
          )}
        </>
      )}

      <p className="mt-6 text-sm text-gray-400 text-right">
        Source: Données des accidents du travail - {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default SecteurAccidentsTravailChart;
