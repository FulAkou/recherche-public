// // import { useEffect, useState } from "react";
// // import {
// //   Bar,
// //   BarChart,
// //   CartesianGrid,
// //   Cell,
// //   Legend,
// //   ResponsiveContainer,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// // } from "recharts";
// // import { fetchBilanProgrammeData } from "../../services/api";

// // const COLORS = {
// //   "Accès à des soins de santé de qualité": "#3b82f6",
// //   "Autonomisation des femmes (SWEDD)": "#10b981",
// //   "Accès au Logement": "#f59e0b",
// //   "Accès au stage et à l'emploi des jeunes": "#8b5cf6",
// // };

// // // Hook de récupération des données
// // const useBilanProgrammeData = () => {
// //   const [data, setData] = useState({
// //     chartData: [],
// //     loading: true,
// //     error: null,
// //   });

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const rawData = await fetchBilanProgrammeData();
// //         const chartData = rawData
// //           .filter(
// //             (item) =>
// //               item.programme &&
// //               item.details &&
// //               typeof item.valeur === "number" &&
// //               !isNaN(item.valeur)
// //           )
// //           .sort((a, b) => b.valeur - a.valeur);

// //         setData({
// //           chartData,
// //           loading: false,
// //           error: null,
// //         });
// //       } catch (err) {
// //         setData({
// //           chartData: [],
// //           loading: false,
// //           error: err.message,
// //         });
// //       }
// //     };

// //     loadData();
// //   }, []);

// //   return data;
// // };

// // const ProgramLegend = () => (
// //   <div className="flex flex-wrap justify-center gap-4 mt-4">
// //     {Object.entries(COLORS).map(([program, color]) => (
// //       <div key={program} className="flex items-center">
// //         <div
// //           className="w-4 h-4 mr-2 rounded-full"
// //           style={{ backgroundColor: color }}
// //         />
// //         <span className="text-sm text-gray-700">{program}</span>
// //       </div>
// //     ))}
// //   </div>
// // );

// // //Composant principal du graphique
// // const BilanProgrammeServiceGouvChart = () => {
// //   const { chartData, loading, error } = useBilanProgrammeData();

// //   return (
// //     <div className="w-full bg-white rounded-xl shadow-lg p-6 ">
// //       <h2 className="text-2xl font-bold text-gray-800 mb-2">
// //         Répartition des actions par programme
// //       </h2>
// //       <p className="text-gray-600 mb-6">
// //         Ce graphique illustre les principales interventions réalisées dans le
// //         cadre des programmes d'amélioration des conditions de vie des ménages.
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
// //           {chartData.length > 0 ? (
// //             <>
// //               <div className="h-[600px] w-full">
// //                 <ResponsiveContainer width="100%" height="100%">
// //                   <BarChart
// //                     data={chartData}
// //                     layout="vertical"
// //                     margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
// //                   >
// //                     <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
// //                     <XAxis
// //                       type="number"
// //                       tick={{ fill: "#555" }}
// //                       axisLine={{ stroke: "#ccc" }}
// //                     />
// //                     <YAxis
// //                       type="category"
// //                       dataKey="details"
// //                       width={200}
// //                       tick={{ fontSize: 7, fill: "#555" }}
// //                       axisLine={{ stroke: "#ccc" }}
// //                     />
// //                     <Tooltip
// //                       contentStyle={{
// //                         backgroundColor: "white",
// //                         borderRadius: "8px",
// //                         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
// //                         border: "none",
// //                       }}
// //                       formatter={(value) => [value, "Valeur"]}
// //                     />
// //                     <Legend wrapperStyle={{ paddingTop: "20px" }} />
// //                     <Bar dataKey="valeur" name="Valeur">
// //                       {chartData.map((entry, index) => (
// //                         <Cell
// //                           key={`cell-${index}`}
// //                           fill={COLORS[entry.programme] || "#8884d8"}
// //                         />
// //                       ))}
// //                     </Bar>
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               </div>
// //               <ProgramLegend />
// //             </>
// //           ) : (
// //             <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
// //               <p className="text-gray-500">
// //                 Aucune donnée disponible pour les programmes
// //               </p>
// //             </div>
// //           )}
// //           <p className="mt-6 text-sm text-gray-400 text-right">
// //             Source : Ministère de l'Enseignement Supérieur et de la Recherche
// //             Scientifique
// //           </p>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default BilanProgrammeServiceGouvChart;

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
// import { fetchBilanProgrammeData } from "../../services/api";

// const COLORS = {
//   "Accès à des soins de santé de qualité": "#3b82f6",
//   "Autonomisation des femmes (SWEDD)": "#10b981",
//   "Accès au Logement": "#f59e0b",
//   "Accès au stage et à l'emploi des jeunes": "#8b5cf6",
// };

// const useBilanProgrammeData = () => {
//   const [data, setData] = useState({
//     chartData: [],
//     loading: true,
//     error: null,
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const rawData = await fetchBilanProgrammeData();
//         const chartData = rawData.filter(
//           (item) =>
//             item.programme &&
//             item.details &&
//             typeof item.valeur === "number" &&
//             !isNaN(item.valeur).sort((a, b) => b.valeur - a.valeur)
//         );

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

//   return data;
// };

// const ProgramLegend = () => (
//   <div className="flex flex-wrap justify-center gap-4 mt-4">
//     {Object.entries(COLORS).map(([program, color]) => (
//       <div key={program} className="flex items-center">
//         <div
//           className="w-4 h-4 mr-2 rounded-full"
//           style={{ backgroundColor: color }}
//         />
//         <span className="text-sm text-gray-700">{program}</span>
//       </div>
//     ))}
//   </div>
// );

// const AnalyseSection = ({ data }) => {
//   if (!data || data.length === 0) return null;

//   // Calcul des totaux par programme
//   const programmes = {};
//   data.forEach((item) => {
//     if (!programmes[item.programme]) {
//       programmes[item.programme] = 0;
//     }
//     programmes[item.programme] += item.valeur;
//   });

//   const totalGeneral = Object.values(programmes).reduce((a, b) => a + b, 0);
//   const top5Actions = [...data].slice(0, 5);

//   return (
//     <div className="mt-8 bg-gray-50 rounded-xl p-6">
//       <h3 className="text-xl font-bold text-gray-800 mb-6">
//         Analyse des Programmes
//       </h3>

//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Top 5 des actions */}
//         <div>
//           <h4 className="font-semibold text-gray-700 mb-4">
//             Top 5 des actions les plus financées
//           </h4>
//           <div className="space-y-3">
//             {top5Actions.map((action, index) => (
//               <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
//                 <div className="flex justify-between items-center mb-1">
//                   <span className="font-medium text-gray-800">
//                     {action.details}
//                   </span>
//                   <span className="text-sm font-semibold">
//                     {action.valeur.toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex items-center">
//                   <div
//                     className="h-2 rounded-full"
//                     style={{
//                       backgroundColor: COLORS[action.programme] || "#8884d8",
//                       width: `${
//                         (action.valeur / top5Actions[0].valeur) * 100
//                       }%`,
//                     }}
//                   />
//                   <span className="ml-2 text-xs text-gray-500">
//                     {action.programme}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Synthèse */}
//         <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//           <h4 className="font-semibold text-blue-800 mb-2">Synthèse</h4>
//           <ul className="list-disc pl-5 space-y-1 text-gray-700">
//             <li>
//               Budget total alloué :{" "}
//               <span className="font-medium">
//                 {totalGeneral.toLocaleString()} unités
//               </span>
//             </li>
//             <li>
//               Programme le plus important :{" "}
//               <span className="font-medium">
//                 {Object.entries(programmes).sort((a, b) => b[1] - a[1])[0][0]}
//               </span>
//             </li>
//             <li>
//               Action la plus financée :{" "}
//               <span className="font-medium">
//                 {top5Actions[0].details} (
//                 {top5Actions[0].valeur.toLocaleString()})
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// const BilanProgrammeServiceGouvChart = () => {
//   const { chartData, loading, error } = useBilanProgrammeData();

//   return (
//     <div className="w-full bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">
//         Répartition des actions par programme
//       </h2>
//       <p className="text-gray-600 mb-6">
//         Ce graphique illustre les principales interventions réalisées dans le
//         cadre des programmes d'amélioration des conditions de vie des ménages.
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
//           {chartData.length > 0 ? (
//             <>
//               <div className="h-[600px] w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={chartData}
//                     layout="vertical"
//                     margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//                     <XAxis
//                       type="number"
//                       tick={{ fill: "#555" }}
//                       axisLine={{ stroke: "#ccc" }}
//                     />
//                     <YAxis
//                       type="category"
//                       dataKey="details"
//                       width={200}
//                       tick={{ fontSize: 7, fill: "#555" }}
//                       axisLine={{ stroke: "#ccc" }}
//                     />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "white",
//                         borderRadius: "8px",
//                         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                         border: "none",
//                       }}
//                       formatter={(value) => [value, "Valeur"]}
//                     />
//                     <Legend wrapperStyle={{ paddingTop: "20px" }} />
//                     <Bar dataKey="valeur" name="Valeur">
//                       {chartData.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[entry.programme] || "#8884d8"}
//                         />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//               <ProgramLegend />
//               <AnalyseSection data={chartData} />
//             </>
//           ) : (
//             <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
//               <p className="text-gray-500">
//                 Aucune donnée disponible pour les programmes
//               </p>
//             </div>
//           )}
//           <p className="mt-6 text-sm text-gray-400 text-right">
//             Source : Ministère de l'Enseignement Supérieur et de la Recherche
//             Scientifique
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default BilanProgrammeServiceGouvChart;

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchBilanProgrammeData } from "../../services/api";

const COLORS = {
  "Accès à des soins de santé de qualité": "#3b82f6",
  "Autonomisation des femmes (SWEDD)": "#10b981",
  "Accès au Logement": "#f59e0b",
  "Accès au stage et à l'emploi des jeunes": "#8b5cf6",
};

const useBilanProgrammeData = () => {
  const [data, setData] = useState({
    chartData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const rawData = await fetchBilanProgrammeData();
        // Correction ici : sort doit être appliqué après filter, pas dans filter
        const chartData = rawData
          .filter(
            (item) =>
              item.programme &&
              item.details &&
              typeof item.valeur === "number" &&
              !isNaN(item.valeur)
          )
          .sort((a, b) => b.valeur - a.valeur);

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

  return data;
};

const ProgramLegend = () => (
  <div className="flex flex-wrap justify-center gap-4 mt-4">
    {Object.entries(COLORS).map(([program, color]) => (
      <div key={program} className="flex items-center">
        <div
          className="w-4 h-4 mr-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm text-gray-700">{program}</span>
      </div>
    ))}
  </div>
);

const AnalyseSection = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Calcul des totaux par programme
  const programmes = {};
  data.forEach((item) => {
    if (!programmes[item.programme]) {
      programmes[item.programme] = 0;
    }
    programmes[item.programme] += item.valeur;
  });

  const totalGeneral = Object.values(programmes).reduce((a, b) => a + b, 0);
  const top5Actions = [...data].slice(0, 5);

  return (
    <div className="mt-8 bg-gray-50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Analyse des Programmes
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Top 5 des actions */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-4">
            Top 5 des actions les plus financées
          </h4>
          <div className="space-y-3">
            {top5Actions.map((action, index) => (
              <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-800">
                    {action.details}
                  </span>
                  <span className="text-sm font-semibold">
                    {action.valeur.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      backgroundColor: COLORS[action.programme] || "#8884d8",
                      width: `${
                        (action.valeur / top5Actions[0].valeur) * 100
                      }%`,
                    }}
                  />
                  <span className="ml-2 text-xs text-gray-500">
                    {action.programme}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Synthèse */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Synthèse</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              Budget total alloué :{" "}
              <span className="font-medium">
                {totalGeneral.toLocaleString()} unités
              </span>
            </li>
            <li>
              Programme le plus important :{" "}
              <span className="font-medium">
                {Object.entries(programmes).sort((a, b) => b[1] - a[1])[0][0]}
              </span>
            </li>
            <li>
              Action la plus financée :{" "}
              <span className="font-medium">
                {top5Actions[0].details} (
                {top5Actions[0].valeur.toLocaleString()})
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const BilanProgrammeServiceGouvChart = () => {
  const { chartData, loading, error } = useBilanProgrammeData();

  const exportChartAsPDF = () => {
    const chartDiv = document.getElementById("chart8");
    html2canvas(chartDiv).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Bilan des programmes.pdf");
    });
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Répartition des actions par programme
        </h2>
        <button
          onClick={exportChartAsPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          Exporter en PDF
        </button>
      </div>
      <p className="text-gray-600 mb-6">
        Ce graphique illustre les principales interventions réalisées dans le
        cadre des programmes d'amélioration des conditions de vie des ménages.
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
          {chartData.length > 0 ? (
            <>
              <div className="h-[600px] w-full" id="chart8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis
                      type="number"
                      tick={{ fill: "#555" }}
                      axisLine={{ stroke: "#ccc" }}
                      label={{
                        value: "Valeur",
                        angle: 0,
                        position: "insideBottom",
                        offset: -5,
                        fill: "#333",
                        fontSize: 14,
                      }}
                    />
                    <YAxis
                      type="category"
                      dataKey="details"
                      width={200}
                      tick={{ fontSize: 7, fill: "#555" }}
                      axisLine={{ stroke: "#ccc" }}
                      label={{
                        value: "Action",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#333",
                        fontSize: 14,
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "none",
                      }}
                      formatter={(value) => [value, "Valeur"]}
                    />
                    <Legend wrapperStyle={{ paddingTop: "20px" }} />
                    <Bar dataKey="valeur" name="Valeur">
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[entry.programme] || "#8884d8"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <ProgramLegend />
              <AnalyseSection data={chartData} />
            </>
          ) : (
            <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                Aucune donnée disponible pour les programmes
              </p>
            </div>
          )}
        </>
      )}
      <p className="mt-6 text-sm text-gray-400 text-right">
        Source : Ministère de l'Enseignement Supérieur et de la Recherche
        Scientifique
      </p>
    </div>
  );
};

export default BilanProgrammeServiceGouvChart;
