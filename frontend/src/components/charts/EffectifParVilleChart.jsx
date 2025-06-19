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
// // import { fetchEffectifData } from "../../services/api";

// // const useEffectifData = () => {
// //   const [data, setData] = useState({
// //     allData: [],
// //     loading: true,
// //     error: null,
// //     periode: "2020-2021",
// //     sexe: "MASCULIN",
// //     statut: "PRIVE",
// //   });

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const allData = await fetchEffectifData();
// //         setData({
// //           allData,
// //           loading: false,
// //           error: null,
// //           periode: "2020-2021",
// //           sexe: "MASCULIN",
// //           statut: "PRIVE",
// //         });
// //       } catch (err) {
// //         setData({
// //           allData: [],
// //           loading: false,
// //           error: err.message,
// //           periode: "2020-2021",
// //           sexe: "MASCULIN",
// //           statut: "PRIVE",
// //         });
// //       }
// //     };

// //     loadData();
// //   }, []);

// //   return { ...data, setData };
// // };

// // const FilterControls = ({
// //   periodesDisponibles,
// //   periode,
// //   sexe,
// //   statut,
// //   onFilterChange,
// // }) => {
// //   return (
// //     <div className="flex flex-wrap gap-4 mb-6">
// //       <div className="flex-1 min-w-[200px]">
// //         <label className="block text-sm font-medium text-gray-700 mb-1">
// //           Période
// //         </label>
// //         <select
// //           value={periode}
// //           onChange={(e) => onFilterChange("periode", e.target.value)}
// //           className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         >
// //           {periodesDisponibles.map((p) => (
// //             <option key={p} value={p}>
// //               {p}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       <div className="flex-1 min-w-[150px]">
// //         <label className="block text-sm font-medium text-gray-700 mb-1">
// //           Genre
// //         </label>
// //         <select
// //           value={sexe}
// //           onChange={(e) => onFilterChange("sexe", e.target.value)}
// //           className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         >
// //           <option value="MASCULIN">Masculin</option>
// //           <option value="FEMININ">Féminin</option>
// //         </select>
// //       </div>

// //       <div className="flex-1 min-w-[150px]">
// //         <label className="block text-sm font-medium text-gray-700 mb-1">
// //           Statut
// //         </label>
// //         <select
// //           value={statut}
// //           onChange={(e) => onFilterChange("statut", e.target.value)}
// //           className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         >
// //           <option value="PRIVE">Privé</option>
// //           <option value="PUBLIC">Public</option>
// //         </select>
// //       </div>
// //     </div>
// //   );
// // };

// // const EffectifParVilleChart = () => {
// //   const { allData, loading, error, periode, sexe, statut, setData } =
// //     useEffectifData();

// //   const periodesDisponibles = [
// //     ...new Set(allData.map((d) => d.periode)),
// //   ].sort();
// //   const filteredData = allData.filter(
// //     (item) =>
// //       item.periode === periode && item.sexe === sexe && item.statut === statut
// //   );

// //   const handleFilterChange = (filterName, value) => {
// //     setData((prev) => ({
// //       ...prev,
// //       [filterName]: value,
// //     }));
// //   };

// //   return (
// //     <div className="w-full bg-white rounded-xl shadow-lg p-6">
// //       <h2 className="text-2xl font-bold text-gray-800 mb-2">
// //         Effectif {sexe.toLowerCase()} – {statut.toLowerCase()} ({periode})
// //       </h2>

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
// //           <FilterControls
// //             periodesDisponibles={periodesDisponibles}
// //             periode={periode}
// //             sexe={sexe}
// //             statut={statut}
// //             onFilterChange={handleFilterChange}
// //           />

// //           <div className="h-[500px] w-full">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <BarChart
// //                 data={filteredData}
// //                 margin={{ top: 10, right: 30, left: 20, bottom: 60 }}
// //               >
// //                 <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
// //                 <XAxis
// //                   dataKey="ville"
// //                   angle={-30}
// //                   textAnchor="end"
// //                   interval={0}
// //                   height={80}
// //                   tick={{ fill: "#555" }}
// //                   axisLine={{ stroke: "#ccc" }}
// //                 />
// //                 <YAxis tick={{ fill: "#555" }} axisLine={{ stroke: "#ccc" }} />
// //                 <Tooltip
// //                   contentStyle={{
// //                     backgroundColor: "white",
// //                     borderRadius: "8px",
// //                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
// //                     border: "none",
// //                   }}
// //                 />
// //                 <Legend wrapperStyle={{ paddingTop: "20px" }} />
// //                 <Bar
// //                   dataKey="effectif"
// //                   fill="#3b82f6"
// //                   name="Effectif"
// //                   radius={[4, 4, 0, 0]}
// //                 />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>

// //           <p className="mt-4 text-sm text-gray-500 text-center">
// //             Source : Données éducation {periode}
// //           </p>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default EffectifParVilleChart;

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
// import { fetchEffectifData } from "../../services/api";

// const useEffectifData = () => {
//   const [data, setData] = useState({
//     allData: [],
//     loading: true,
//     error: null,
//     periode: "2020-2021",
//     sexe: "MASCULIN",
//     statut: "PRIVE",
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const allData = await fetchEffectifData();
//         setData({
//           allData,
//           loading: false,
//           error: null,
//           periode: "2020-2021",
//           sexe: "MASCULIN",
//           statut: "PRIVE",
//         });
//       } catch (err) {
//         setData({
//           allData: [],
//           loading: false,
//           error: err.message,
//           periode: "2020-2021",
//           sexe: "MASCULIN",
//           statut: "PRIVE",
//         });
//       }
//     };

//     loadData();
//   }, []);

//   return { ...data, setData };
// };

// const FilterControls = ({
//   periodesDisponibles,
//   periode,
//   sexe,
//   statut,
//   onFilterChange,
// }) => {
//   return (
//     <div className="flex flex-wrap gap-4 mb-6">
//       <div className="flex-1 min-w-[200px]">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Période
//         </label>
//         <select
//           value={periode}
//           onChange={(e) => onFilterChange("periode", e.target.value)}
//           className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {periodesDisponibles.map((p) => (
//             <option key={p} value={p}>
//               {p}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex-1 min-w-[150px]">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Genre
//         </label>
//         <select
//           value={sexe}
//           onChange={(e) => onFilterChange("sexe", e.target.value)}
//           className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="MASCULIN">Masculin</option>
//           <option value="FEMININ">Féminin</option>
//         </select>
//       </div>

//       <div className="flex-1 min-w-[150px]">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Statut
//         </label>
//         <select
//           value={statut}
//           onChange={(e) => onFilterChange("statut", e.target.value)}
//           className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="PRIVE">Privé</option>
//           <option value="PUBLIC">Public</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// const AnalyseSection = ({ data, periode, sexe, statut }) => {
//   if (!data || data.length === 0) return null;

//   // Calcul des indicateurs
//   const totalEffectif = data.reduce((sum, item) => sum + item.effectif, 0);
//   const moyenneParVille = totalEffectif / data.length;
//   const villeMaxEffectif = data.reduce((max, item) =>
//     item.effectif > max.effectif ? item : max
//   );
//   const villeMinEffectif = data.reduce((min, item) =>
//     item.effectif < min.effectif ? item : min
//   );

//   // Préparation des données pour l'évolution temporelle
//   const evolutionData = data
//     .filter((item) => item.ville === villeMaxEffectif.ville)
//     .sort((a, b) => a.periode.localeCompare(b.periode));

//   return (
//     <div className="mt-8 bg-gray-50 rounded-xl p-6">
//       <h3 className="text-xl font-bold text-gray-800 mb-6">
//         Analyse des Données
//       </h3>

//       <div className="grid md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <h4 className="font-semibold text-gray-700 mb-2">Effectif Total</h4>
//           <p className="text-2xl font-bold text-blue-600">
//             {totalEffectif.toLocaleString()}
//           </p>
//           <p className="text-sm text-gray-500 mt-1">
//             {sexe.toLowerCase()} - {statut.toLowerCase()}
//           </p>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <h4 className="font-semibold text-gray-700 mb-2">
//             Moyenne par Ville
//           </h4>
//           <p className="text-2xl font-bold text-green-600">
//             {Math.round(moyenneParVille).toLocaleString()}
//           </p>
//           <p className="text-sm text-gray-500 mt-1">Sur {data.length} villes</p>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <h4 className="font-semibold text-gray-700 mb-2">
//             Ville la plus peuplée
//           </h4>
//           <p className="text-xl font-bold text-purple-600">
//             {villeMaxEffectif.ville}
//           </p>
//           <p className="text-sm text-gray-500 mt-1">
//             {villeMaxEffectif.effectif.toLocaleString()} élèves
//           </p>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div>
//           <h4 className="font-semibold text-gray-700 mb-4">
//             Évolution à {villeMaxEffectif.ville} (2018-2021)
//           </h4>
//           <div className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart
//                 data={evolutionData}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//                 <XAxis dataKey="periode" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="effectif"
//                   stroke="#8884d8"
//                   strokeWidth={2}
//                   name="Effectif"
//                   dot={{ r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div>
//           <h4 className="font-semibold text-gray-700 mb-4">
//             Répartition par taille
//           </h4>
//           <div className="space-y-3">
//             <div className="bg-white p-3 rounded-lg shadow-sm">
//               <div className="flex justify-between mb-1">
//                 <span className="font-medium">
//                   Grandes villes (&gt; 10k élèves)
//                 </span>
//                 <span className="text-sm font-semibold">
//                   {data.filter((d) => d.effectif > 10000).length}
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-blue-500 h-2 rounded-full"
//                   style={{
//                     width: `${
//                       (data.filter((d) => d.effectif > 10000).length /
//                         data.length) *
//                       100
//                     }%`,
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="bg-white p-3 rounded-lg shadow-sm">
//               <div className="flex justify-between mb-1">
//                 <span className="font-medium">Villes moyennes (5k-10k)</span>
//                 <span className="text-sm font-semibold">
//                   {
//                     data.filter(
//                       (d) => d.effectif >= 5000 && d.effectif <= 10000
//                     ).length
//                   }
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-green-500 h-2 rounded-full"
//                   style={{
//                     width: `${
//                       (data.filter(
//                         (d) => d.effectif >= 5000 && d.effectif <= 10000
//                       ).length /
//                         data.length) *
//                       100
//                     }%`,
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="bg-white p-3 rounded-lg shadow-sm">
//               <div className="flex justify-between mb-1">
//                 <span className="font-medium">Petites villes (&lt; 5k)</span>
//                 <span className="text-sm font-semibold">
//                   {data.filter((d) => d.effectif < 5000).length}
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-orange-500 h-2 rounded-full"
//                   style={{
//                     width: `${
//                       (data.filter((d) => d.effectif < 5000).length /
//                         data.length) *
//                       100
//                     }%`,
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EffectifParVilleChart = () => {
//   const { allData, loading, error, periode, sexe, statut, setData } =
//     useEffectifData();

//   const periodesDisponibles = [
//     ...new Set(allData.map((d) => d.periode)),
//   ].sort();
//   const filteredData = allData.filter(
//     (item) =>
//       item.periode === periode && item.sexe === sexe && item.statut === statut
//   );

//   const handleFilterChange = (filterName, value) => {
//     setData((prev) => ({
//       ...prev,
//       [filterName]: value,
//     }));
//   };

//   return (
//     <div className="w-full bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">
//         Effectif {sexe.toLowerCase()} – {statut.toLowerCase()} ({periode})
//       </h2>

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
//           <FilterControls
//             periodesDisponibles={periodesDisponibles}
//             periode={periode}
//             sexe={sexe}
//             statut={statut}
//             onFilterChange={handleFilterChange}
//           />

//           <div className="h-[500px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={filteredData}
//                 margin={{ top: 10, right: 30, left: 20, bottom: 60 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//                 <XAxis
//                   dataKey="ville"
//                   angle={-30}
//                   textAnchor="end"
//                   interval={0}
//                   height={80}
//                   tick={{ fill: "#555" }}
//                   axisLine={{ stroke: "#ccc" }}
//                 />
//                 <YAxis tick={{ fill: "#555" }} axisLine={{ stroke: "#ccc" }} />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "white",
//                     borderRadius: "8px",
//                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                     border: "none",
//                   }}
//                   formatter={(value) => [value, "Nombre d'élèves"]}
//                 />
//                 <Legend wrapperStyle={{ paddingTop: "20px" }} />
//                 <Bar
//                   dataKey="effectif"
//                   fill="#3b82f6"
//                   name="Effectif"
//                   radius={[4, 4, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           <AnalyseSection
//             data={allData.filter(
//               (item) => item.sexe === sexe && item.statut === statut
//             )}
//             periode={periode}
//             sexe={sexe}
//             statut={statut}
//           />

//           <p className="mt-4 text-sm text-gray-500 text-center">
//             Source : Données éducation {periode}
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default EffectifParVilleChart;

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchEffectifData } from "../../services/api";

const useEffectifData = () => {
  const [data, setData] = useState({
    allData: [],
    loading: true,
    error: null,
    periode: "2020-2021",
    sexe: "MASCULIN",
    sexeCompare: null,
    statut: "PRIVE",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const allData = await fetchEffectifData();
        setData({
          allData,
          loading: false,
          error: null,
          periode: "2020-2021",
          sexe: "MASCULIN",
          sexeCompare: null,
          statut: "PRIVE",
        });
      } catch (err) {
        setData({
          allData: [],
          loading: false,
          error: err.message,
          periode: "2020-2021",
          sexe: "MASCULIN",
          sexeCompare: null,
          statut: "PRIVE",
        });
      }
    };

    loadData();
  }, []);

  return { ...data, setData };
};

const FilterControls = ({
  periodesDisponibles,
  periode,
  sexe,
  sexeCompare,
  statut,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Période
        </label>
        <select
          value={periode}
          onChange={(e) => onFilterChange("periode", e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {periodesDisponibles.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Genre principal
        </label>
        <select
          value={sexe}
          onChange={(e) => onFilterChange("sexe", e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="MASCULIN">Masculin</option>
          <option value="FEMININ">Féminin</option>
        </select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comparer avec
        </label>
        <select
          value={sexeCompare || ""}
          onChange={(e) =>
            onFilterChange("sexeCompare", e.target.value || null)
          }
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Aucune comparaison</option>
          <option value="MASCULIN">Masculin</option>
          <option value="FEMININ">Féminin</option>
        </select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Statut
        </label>
        <select
          value={statut}
          onChange={(e) => onFilterChange("statut", e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="PRIVE">Privé</option>
          <option value="PUBLIC">Public</option>
        </select>
      </div>
    </div>
  );
};

const AnalyseSection = ({ data, periode, sexe, sexeCompare, statut }) => {
  if (!data || data.length === 0) return null;

  // Calcul des indicateurs pour le genre principal
  const dataGenrePrincipal = data.filter(
    (item) =>
      item.periode === periode && item.sexe === sexe && item.statut === statut
  );

  const totalEffectif = dataGenrePrincipal.reduce(
    (sum, item) => sum + item.effectif,
    0
  );
  const moyenneParVille = totalEffectif / dataGenrePrincipal.length;
  const villeMaxEffectif = dataGenrePrincipal.reduce((max, item) =>
    item.effectif > max.effectif ? item : max
  );

  // Calcul des indicateurs pour le genre de comparaison si il existe
  let comparaisonData = null;
  if (sexeCompare) {
    const dataGenreCompare = data.filter(
      (item) =>
        item.periode === periode &&
        item.sexe === sexeCompare &&
        item.statut === statut
    );

    const totalEffectifCompare = dataGenreCompare.reduce(
      (sum, item) => sum + item.effectif,
      0
    );
    const variation =
      ((totalEffectif - totalEffectifCompare) / totalEffectifCompare) * 100;

    comparaisonData = {
      totalEffectifCompare,
      variation,
      dataGenreCompare,
    };
  }

  // Préparation des données pour l'évolution temporelle
  const evolutionData = data
    .filter(
      (item) => item.ville === villeMaxEffectif.ville && item.statut === statut
    )
    .sort((a, b) => a.periode.localeCompare(b.periode));

  return (
    <div className="mt-8 bg-gray-50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Analyse des Données
      </h3>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-2">Effectif Total</h4>
          <p className="text-2xl font-bold text-blue-600">
            {totalEffectif.toLocaleString()}
          </p>
          {comparaisonData && (
            <p
              className={`text-sm mt-1 ${
                comparaisonData.variation >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {comparaisonData.variation >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(comparaisonData.variation).toFixed(1)}% vs{" "}
              {sexeCompare.toLowerCase()}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            {sexe.toLowerCase()} - {statut.toLowerCase()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-2">
            Moyenne par Ville
          </h4>
          <p className="text-2xl font-bold text-green-600">
            {Math.round(moyenneParVille).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Sur {dataGenrePrincipal.length} villes
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-2">
            Ville la plus peuplée
          </h4>
          <p className="text-xl font-bold text-purple-600">
            {villeMaxEffectif.ville}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {villeMaxEffectif.effectif.toLocaleString()} élèves
          </p>
        </div>
      </div>

      {/* ... reste du code AnalyseSection inchangé ... */}
    </div>
  );
};

const EffectifParVilleChart = () => {
  const {
    allData,
    loading,
    error,
    periode,
    sexe,
    sexeCompare,
    statut,
    setData,
  } = useEffectifData();

  const periodesDisponibles = [
    ...new Set(allData.map((d) => d.periode)),
  ].sort();

  const filteredData = allData.filter(
    (item) =>
      item.periode === periode &&
      (item.sexe === sexe || (sexeCompare && item.sexe === sexeCompare)) &&
      item.statut === statut
  );

  const handleFilterChange = (filterName, value) => {
    setData((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // Préparer les données pour le graphique comparatif
  const prepareComparisonData = () => {
    if (!sexeCompare) {
      return filteredData.filter((item) => item.sexe === sexe);
    }

    // Grouper par ville et créer des entrées pour les deux genres
    const villes = [...new Set(filteredData.map((item) => item.ville))];
    return villes.map((ville) => {
      const dataGenrePrincipal = filteredData.find(
        (item) => item.ville === ville && item.sexe === sexe
      );
      const dataGenreCompare = filteredData.find(
        (item) => item.ville === ville && item.sexe === sexeCompare
      );

      return {
        ville,
        [`${sexe.toLowerCase()}`]: dataGenrePrincipal?.effectif || 0,
        [`${sexeCompare.toLowerCase()}`]: dataGenreCompare?.effectif || 0,
      };
    });
  };

  const chartData = prepareComparisonData();

  const exportChartAsPDF = () => {
    const chartDiv = document.getElementById("chart5");
    html2canvas(chartDiv).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Effectif par ville.pdf");
    });
  };

  return (
    <div className="w-full ">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Effectif par ville ({periode}) - {statut.toLowerCase()}
          {sexeCompare &&
            ` : ${sexe.toLowerCase()} vs ${sexeCompare.toLowerCase()}`}
          {!sexeCompare && ` : ${sexe.toLowerCase()}`}
        </h2>
        <button
          onClick={exportChartAsPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          Exporter en PDF
        </button>
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

      {!loading && !error && (
        <>
          <FilterControls
            periodesDisponibles={periodesDisponibles}
            periode={periode}
            sexe={sexe}
            sexeCompare={sexeCompare}
            statut={statut}
            onFilterChange={handleFilterChange}
          />

          <div className="h-[500px] w-full" id="chart5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis
                  dataKey="ville"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
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
                  formatter={(value, name) => [value, name]}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar
                  dataKey={sexe.toLowerCase()}
                  fill="#3b82f6"
                  name={`Effectif (${sexe.toLowerCase()})`}
                  radius={[4, 4, 0, 0]}
                />
                {sexeCompare && (
                  <Bar
                    dataKey={sexeCompare.toLowerCase()}
                    fill="#ec4899"
                    name={`Effectif (${sexeCompare.toLowerCase()})`}
                    radius={[4, 4, 0, 0]}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <AnalyseSection
            data={allData.filter(
              (item) => item.periode === periode && item.statut === statut
            )}
            periode={periode}
            sexe={sexe}
            sexeCompare={sexeCompare}
            statut={statut}
          />

          <p className="flex justify-end mt-4 text-sm text-gray-500 text-center">
            Source : Données éducation {periode}
          </p>
        </>
      )}
    </div>
  );
};

export default EffectifParVilleChart;
