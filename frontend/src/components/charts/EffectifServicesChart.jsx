// // import { useEffect, useState } from "react";
// // import {
// //   Bar,
// //   BarChart,
// //   CartesianGrid,
// //   Legend,
// //   ResponsiveContainer,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// // } from "recharts";
// // import { fetchEffectifServicesData } from "../../services/api";

// // // Couleurs pour les catégories
// // const COLORS = {
// //   Medecine: "#8884d8",
// //   Chirurgie: "#82ca9d",
// //   Pediatrie: "#ffc658",
// //   Gyneco: "#ff8042",
// //   "Autres services": "#0088FE",
// // };

// // // Hook personnalisé pour gérer les données
// // const useEffectifServices = () => {
// //   const [data, setData] = useState({
// //     rawData: [],
// //     loading: true,
// //     error: null,
// //   });

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const rawData = await fetchEffectifServicesData();
// //         setData({
// //           rawData,
// //           loading: false,
// //           error: null,
// //         });
// //       } catch (err) {
// //         setData({
// //           rawData: [],
// //           loading: false,
// //           error: err.message,
// //         });
// //       }
// //     };

// //     loadData();
// //   }, []);

// //   return data;
// // };

// // // Composant de légende
// // const ServicesLegend = () => (
// //   <div className="flex flex-wrap justify-center gap-4 mt-4">
// //     {Object.entries(COLORS).map(([category, color]) => (
// //       <div key={category} className="flex items-center">
// //         <div
// //           className="w-4 h-4 mr-2 rounded-full"
// //           style={{ backgroundColor: color }}
// //         />
// //         <span className="text-sm text-gray-700">{category}</span>
// //       </div>
// //     ))}
// //   </div>
// // );

// // // Composant principal
// // const EffectifServicesChart = () => {
// //   const { rawData, loading, error } = useEffectifServices();
// //   const [selectedYear, setSelectedYear] = useState(2009);
// //   const [selectedRegion, setSelectedRegion] = useState("LAGUNES 2");

// //   // Préparer les données pour le graphique
// //   const prepareChartData = () => {
// //     const filtered = rawData.filter(
// //       (item) => item.annee === selectedYear && item.regions === selectedRegion
// //     );

// //     // Grouper par district et catégorie
// //     const grouped = {};
// //     filtered.forEach((item) => {
// //       if (!grouped[item.districtsVillesCommunes]) {
// //         grouped[item.districtsVillesCommunes] = {
// //           name: item.districtsVillesCommunes,
// //         };
// //       }
// //       grouped[item.districtsVillesCommunes][item.categories] = item.effectifs;
// //     });

// //     return Object.values(grouped);
// //   };

// //   const chartData = prepareChartData();
// //   const categories = [...new Set(rawData.map((item) => item.categories))];
// //   const years = [...new Set(rawData.map((item) => item.annee))];
// //   const regions = [...new Set(rawData.map((item) => item.regions))];

// //   return (
// //     <div className="w-full bg-white rounded-xl shadow-lg p-6">
// //       <h2 className="text-2xl font-bold text-gray-800 mb-2">
// //         Effectifs par service médical
// //       </h2>
// //       <p className="text-gray-600 mb-6">
// //         Répartition des effectifs médicaux par district et par type de service.
// //       </p>

// //       {loading && (
// //         <div className="flex justify-center items-center h-64">
// //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //         </div>
// //       )}

// //       {error && (
// //         <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
// //           <div className="flex">
// //             <div className="flex-shrink-0">
// //               <svg
// //                 className="h-5 w-5 text-red-500"
// //                 viewBox="0 0 20 20"
// //                 fill="currentColor"
// //               >
// //                 <path
// //                   fillRule="evenodd"
// //                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
// //                   clipRule="evenodd"
// //                 />
// //               </svg>
// //             </div>
// //             <div className="ml-3">
// //               <p className="text-sm text-red-700">Erreur : {error}</p>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {!loading && !error && (
// //         <>
// //           <div className="flex flex-wrap gap-4 mb-6">
// //             <div className="flex-1 min-w-[200px]">
// //               <label className="block text-sm font-medium mb-1">Année</label>
// //               <select
// //                 value={selectedYear}
// //                 onChange={(e) => setSelectedYear(Number(e.target.value))}
// //                 className="w-full border rounded px-3 py-2 bg-white"
// //               >
// //                 {years.map((year) => (
// //                   <option key={year} value={year}>
// //                     {year}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div className="flex-1 min-w-[200px]">
// //               <label className="block text-sm font-medium mb-1">Région</label>
// //               <select
// //                 value={selectedRegion}
// //                 onChange={(e) => setSelectedRegion(e.target.value)}
// //                 className="w-full border rounded px-3 py-2 bg-white"
// //               >
// //                 {regions.map((region) => (
// //                   <option key={region} value={region}>
// //                     {region}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           {chartData.length > 0 ? (
// //             <>
// //               <div className="h-[500px] w-full">
// //                 <ResponsiveContainer width="100%" height="100%">
// //                   <BarChart
// //                     data={chartData}
// //                     margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
// //                   >
// //                     <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
// //                     <XAxis
// //                       dataKey="name"
// //                       angle={-45}
// //                       textAnchor="end"
// //                       height={80}
// //                       tick={{ fontSize: 12, fill: "#555" }}
// //                       axisLine={{ stroke: "#ccc" }}
// //                     />
// //                     <YAxis
// //                       tick={{ fill: "#555" }}
// //                       axisLine={{ stroke: "#ccc" }}
// //                     />
// //                     <Tooltip
// //                       contentStyle={{
// //                         backgroundColor: "white",
// //                         borderRadius: "8px",
// //                         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
// //                         border: "none",
// //                       }}
// //                     />
// //                     <Legend wrapperStyle={{ paddingTop: "20px" }} />
// //                     {categories.map((category) => (
// //                       <Bar
// //                         key={category}
// //                         dataKey={category}
// //                         fill={COLORS[category] || "#000"}
// //                         name={category}
// //                       />
// //                     ))}
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               </div>
// //               <ServicesLegend />
// //             </>
// //           ) : (
// //             <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
// //               <p className="text-gray-500">
// //                 Aucune donnée disponible pour la sélection actuelle
// //               </p>
// //             </div>
// //           )}

// //           <p className="mt-6 text-sm text-gray-400 text-right">
// //             Source: Données des services médicaux
// //           </p>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default EffectifServicesChart;

// import { useEffect, useState } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { fetchEffectifServicesData } from "../../services/api";

// // Couleurs pour les catégories
// const COLORS = {
//   Medecine: "#8884d8",
//   Chirurgie: "#82ca9d",
//   Pediatrie: "#ffc658",
//   Gyneco: "#ff8042",
//   "Autres services": "#0088FE",
// };

// // Hook personnalisé pour gérer les données
// const useEffectifServices = () => {
//   const [data, setData] = useState({
//     rawData: [],
//     loading: true,
//     error: null,
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const rawData = await fetchEffectifServicesData();
//         setData({
//           rawData,
//           loading: false,
//           error: null,
//         });
//       } catch (err) {
//         setData({
//           rawData: [],
//           loading: false,
//           error: err.message,
//         });
//       }
//     };

//     loadData();
//   }, []);

//   return data;
// };

// // Composant de légende
// const ServicesLegend = () => (
//   <div className="flex flex-wrap justify-center gap-4 mt-4">
//     {Object.entries(COLORS).map(([category, color]) => (
//       <div key={category} className="flex items-center">
//         <div
//           className="w-4 h-4 mr-2 rounded-full"
//           style={{ backgroundColor: color }}
//         />
//         <span className="text-sm text-gray-700">{category}</span>
//       </div>
//     ))}
//   </div>
// );

// // Composant pour le graphique d'évolution temporelle
// const EvolutionChart = ({ rawData, selectedRegion }) => {
//   // Préparer les données pour le graphique d'évolution
//   const prepareEvolutionData = () => {
//     const years = [...new Set(rawData.map((item) => item.annee))].sort();
//     const evolutionData = [];

//     years.forEach((year) => {
//       const yearData = rawData.filter(
//         (item) => item.annee === year && item.regions === selectedRegion
//       );

//       const yearTotals = yearData.reduce((acc, item) => {
//         if (!acc[item.categories]) {
//           acc[item.categories] = 0;
//         }
//         acc[item.categories] += item.effectifs;
//         return acc;
//       }, {});

//       const entry = { year };
//       Object.keys(COLORS).forEach((category) => {
//         entry[category] = yearTotals[category] || 0;
//       });

//       evolutionData.push(entry);
//     });

//     return evolutionData;
//   };

//   const evolutionData = prepareEvolutionData();

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-bold text-gray-800 mb-4">
//         Évolution des effectifs par service ({selectedRegion})
//       </h3>
//       <div className="h-[400px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={evolutionData}
//             margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//             <XAxis
//               dataKey="year"
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
//             {Object.entries(COLORS).map(([category, color]) => (
//               <Line
//                 key={category}
//                 type="monotone"
//                 dataKey={category}
//                 stroke={color}
//                 strokeWidth={2}
//                 name={category}
//                 dot={{ r: 4 }}
//               />
//             ))}
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//       <ServicesLegend />
//     </div>
//   );
// };

// // Composant principal
// const EffectifServicesChart = () => {
//   const { rawData, loading, error } = useEffectifServices();
//   const [selectedYear, setSelectedYear] = useState(2009);
//   const [selectedRegion, setSelectedRegion] = useState("LAGUNES 2");

//   // Préparer les données pour le graphique
//   const prepareChartData = () => {
//     const filtered = rawData.filter(
//       (item) => item.annee === selectedYear && item.regions === selectedRegion
//     );

//     // Grouper par district et catégorie
//     const grouped = {};
//     filtered.forEach((item) => {
//       if (!grouped[item.districtsVillesCommunes]) {
//         grouped[item.districtsVillesCommunes] = {
//           name: item.districtsVillesCommunes,
//         };
//       }
//       grouped[item.districtsVillesCommunes][item.categories] = item.effectifs;
//     });

//     return Object.values(grouped);
//   };

//   const chartData = prepareChartData();
//   const categories = [...new Set(rawData.map((item) => item.categories))];
//   const years = [...new Set(rawData.map((item) => item.annee))].sort();
//   const regions = [...new Set(rawData.map((item) => item.regions))];

//   return (
//     <div className="w-full bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">
//         Effectifs par service médical
//       </h2>
//       <p className="text-gray-600 mb-6">
//         Répartition des effectifs médicaux par district et par type de service.
//       </p>

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

//       {!loading && !error && (
//         <>
//           <div className="flex flex-wrap gap-4 mb-6">
//             <div className="flex-1 min-w-[200px]">
//               <label className="block text-sm font-medium mb-1">Année</label>
//               <select
//                 value={selectedYear}
//                 onChange={(e) => setSelectedYear(Number(e.target.value))}
//                 className="w-full border rounded px-3 py-2 bg-white"
//               >
//                 {years.map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex-1 min-w-[200px]">
//               <label className="block text-sm font-medium mb-1">Région</label>
//               <select
//                 value={selectedRegion}
//                 onChange={(e) => setSelectedRegion(e.target.value)}
//                 className="w-full border rounded px-3 py-2 bg-white"
//               >
//                 {regions.map((region) => (
//                   <option key={region} value={region}>
//                     {region}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {chartData.length > 0 ? (
//             <>
//               <div className="h-[500px] w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={chartData}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//                     <XAxis
//                       dataKey="name"
//                       angle={-45}
//                       textAnchor="end"
//                       height={80}
//                       tick={{ fontSize: 12, fill: "#555" }}
//                       axisLine={{ stroke: "#ccc" }}
//                     />
//                     <YAxis
//                       tick={{ fill: "#555" }}
//                       axisLine={{ stroke: "#ccc" }}
//                     />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "white",
//                         borderRadius: "8px",
//                         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                         border: "none",
//                       }}
//                     />
//                     <Legend wrapperStyle={{ paddingTop: "20px" }} />
//                     {categories.map((category) => (
//                       <Bar
//                         key={category}
//                         dataKey={category}
//                         fill={COLORS[category] || "#000"}
//                         name={category}
//                       />
//                     ))}
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//               <ServicesLegend />

//               <EvolutionChart
//                 rawData={rawData}
//                 selectedRegion={selectedRegion}
//               />
//             </>
//           ) : (
//             <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
//               <p className="text-gray-500">
//                 Aucune donnée disponible pour la sélection actuelle
//               </p>
//             </div>
//           )}

//           <p className="mt-6 text-sm text-gray-400 text-right">
//             Source: Données des services médicaux
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default EffectifServicesChart;

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
import { fetchEffectifServicesData } from "../../services/api";

// Couleurs pour les catégories
const COLORS = {
  Medecine: "#8884d8",
  Chirurgie: "#82ca9d",
  Pediatrie: "#ffc658",
  Gyneco: "#ff8042",
  "Autres services": "#0088FE",
};

// Hook personnalisé pour gérer les données
const useEffectifServices = () => {
  const [data, setData] = useState({
    rawData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const rawData = await fetchEffectifServicesData();
        setData({
          rawData,
          loading: false,
          error: null,
        });
      } catch (err) {
        setData({
          rawData: [],
          loading: false,
          error: err.message,
        });
      }
    };

    loadData();
  }, []);

  return data;
};

// Composant de légende
const ServicesLegend = () => (
  <div className="flex flex-wrap justify-center gap-4 mt-4">
    {Object.entries(COLORS).map(([category, color]) => (
      <div key={category} className="flex items-center">
        <div
          className="w-4 h-4 mr-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm text-gray-700">{category}</span>
      </div>
    ))}
  </div>
);

// Composant pour le graphique d'évolution temporelle
const EvolutionChart = ({ rawData, selectedRegion }) => {
  const prepareEvolutionData = () => {
    const years = [...new Set(rawData.map((item) => item.annee))].sort();
    const evolutionData = [];

    years.forEach((year) => {
      const yearData = rawData.filter(
        (item) => item.annee === year && item.regions === selectedRegion
      );

      const yearTotals = yearData.reduce((acc, item) => {
        if (!acc[item.categories]) {
          acc[item.categories] = 0;
        }
        acc[item.categories] += item.effectifs;
        return acc;
      }, {});

      const entry = { year };
      Object.keys(COLORS).forEach((category) => {
        entry[category] = yearTotals[category] || 0;
      });

      evolutionData.push(entry);
    });

    return evolutionData;
  };

  const evolutionData = prepareEvolutionData();

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={evolutionData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="year"
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
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          {Object.entries(COLORS).map(([category, color]) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={color}
              strokeWidth={2}
              name={category}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Composant d'analyse
const AnalyseSection = ({ rawData, selectedYear, selectedRegion }) => {
  if (!rawData || rawData.length === 0) return null;

  // Calcul des indicateurs
  const currentData = rawData.filter(
    (item) => item.annee === selectedYear && item.regions === selectedRegion
  );

  // Totaux par catégorie
  const totalsByCategory = currentData.reduce((acc, item) => {
    if (!acc[item.categories]) acc[item.categories] = 0;
    acc[item.categories] += item.effectifs;
    return acc;
  }, {});

  // Catégorie dominante
  const dominantCategory = Object.entries(totalsByCategory).reduce(
    (max, [cat, total]) => (total > max.total ? { category: cat, total } : max),
    { category: "", total: 0 }
  );

  // Évolution par rapport à l'année précédente
  const prevYearData = rawData.filter(
    (item) => item.annee === selectedYear - 1 && item.regions === selectedRegion
  );
  const prevTotals = prevYearData.reduce((acc, item) => {
    if (!acc[item.categories]) acc[item.categories] = 0;
    acc[item.categories] += item.effectifs;
    return acc;
  }, {});

  const evolution = Object.keys(totalsByCategory).reduce((acc, cat) => {
    const prev = prevTotals[cat] || 0;
    const current = totalsByCategory[cat] || 0;
    acc[cat] = prev > 0 ? ((current - prev) / prev) * 100 : 0;
    return acc;
  }, {});

  // Districts avec le plus d'effectifs
  const districts = [
    ...new Set(currentData.map((item) => item.districtsVillesCommunes)),
  ];
  const districtTotals = districts
    .map((district) => {
      const districtData = currentData.filter(
        (item) => item.districtsVillesCommunes === district
      );
      const total = districtData.reduce((sum, item) => sum + item.effectifs, 0);
      return { district, total };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  return (
    <div className="mt-8 bg-gray-50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Analyse approfondie
      </h3>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-2">Service dominant</h4>
          <p className="text-2xl font-bold text-purple-600">
            {dominantCategory.category}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {dominantCategory.total.toLocaleString()} effectifs
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-2">
            Évolution annuelle
          </h4>
          {Object.entries(evolution).map(([cat, percent]) => (
            <div key={cat} className="flex items-center mb-1">
              <div
                className="w-3 h-3 mr-2 rounded-full"
                style={{ backgroundColor: COLORS[cat] }}
              />
              <span className="text-sm flex-1">{cat}</span>
              <span
                className={`text-sm font-medium ${
                  percent >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {percent >= 0 ? "↑" : "↓"} {Math.abs(percent).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-2">Top districts</h4>
          {districtTotals.map((item, index) => (
            <div key={item.district} className="flex items-center mb-1">
              <span className="text-gray-500 w-6">{index + 1}.</span>
              <span className="flex-1 truncate">{item.district}</span>
              <span className="text-sm font-medium">
                {item.total.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-gray-700 mb-4">
            Répartition par service
          </h4>
          <div className="space-y-3">
            {Object.entries(totalsByCategory).map(([cat, total]) => (
              <div key={cat} className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{cat}</span>
                  <span className="text-sm font-semibold">
                    {total.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(total / dominantCategory.total) * 100}%`,
                      backgroundColor: COLORS[cat],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-4">
            Évolution des effectifs ({selectedRegion})
          </h4>
          <EvolutionChart rawData={rawData} selectedRegion={selectedRegion} />
        </div>
      </div>
    </div>
  );
};

// Composant principal
const EffectifServicesChart = () => {
  const { rawData, loading, error } = useEffectifServices();
  const [selectedYear, setSelectedYear] = useState(2009);
  const [selectedRegion, setSelectedRegion] = useState("LAGUNES 2");

  // Préparer les données pour le graphique
  const prepareChartData = () => {
    const filtered = rawData.filter(
      (item) => item.annee === selectedYear && item.regions === selectedRegion
    );

    // Grouper par district et catégorie
    const grouped = {};
    filtered.forEach((item) => {
      if (!grouped[item.districtsVillesCommunes]) {
        grouped[item.districtsVillesCommunes] = {
          name: item.districtsVillesCommunes,
        };
      }
      grouped[item.districtsVillesCommunes][item.categories] = item.effectifs;
    });

    return Object.values(grouped);
  };

  const chartData = prepareChartData();
  const categories = [...new Set(rawData.map((item) => item.categories))];
  const years = [...new Set(rawData.map((item) => item.annee))].sort();
  const regions = [...new Set(rawData.map((item) => item.regions))];

  const exportChartAsPDF = () => {
    const chartDiv = document.getElementById("chart4");
    html2canvas(chartDiv).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Effectifs par service médical.pdf");
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Effectifs par service médical
        </h2>

        <button
          onClick={exportChartAsPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          Exporter en PDF
        </button>
      </div>

      <p className="text-gray-600 mb-6">
        Répartition des effectifs médicaux par district et par type de service.
      </p>

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

      {!loading && !error && (
        <>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Année</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full border rounded px-3 py-2 bg-white"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Région</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-white"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {chartData.length > 0 ? (
            <>
              <div className="h-[500px] w-full" id="chart4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12, fill: "#555" }}
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
                    {categories.map((category) => (
                      <Bar
                        key={category}
                        dataKey={category}
                        fill={COLORS[category] || "#000"}
                        name={category}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <ServicesLegend />

              <AnalyseSection
                rawData={rawData}
                selectedYear={selectedYear}
                selectedRegion={selectedRegion}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                Aucune donnée disponible pour la sélection actuelle
              </p>
            </div>
          )}

          <p className="mt-6 text-sm text-gray-400 text-right">
            Source: Données des services médicaux
          </p>
        </>
      )}
    </div>
  );
};

export default EffectifServicesChart;
