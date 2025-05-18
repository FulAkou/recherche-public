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
import { fetchMarcheInternetData } from "../../services/api";

const colors = [
  "#8884d8",
  "#82ca9d",
  "#ff7300",
  "#ff0000",
  "#00bfff",
  "#9932cc",
  "#228b22",
];

const useMarcheInternetData = () => {
  const [data, setData] = useState({
    internetFixeData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const { internetFixeData } = await fetchMarcheInternetData();
        setData({
          internetFixeData,
          loading: false,
          error: null,
        });
      } catch (err) {
        setData({
          internetFixeData: [],
          loading: false,
          error: err.message,
        });
      }
    };

    loadData();
  }, []);

  return { ...data };
};

const InternetLineChart = ({ data }) => {
  if (!data.length) return null;

  const entreprises = Object.keys(data[0]).filter((key) => key !== "annee");

  return (
    <div className="h-[400px] w-full ">
      <h3 className="text-lg font-semibold mb-2 text-center">
        Évolution des abonnements par opérateur
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="annee" />
          <YAxis
            label={{
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip formatter={(value) => [`${value} abonnés`, "Nombre"]} />
          <Legend />
          {entreprises.map((entreprise, index) => (
            <Line
              key={entreprise}
              type="monotone"
              dataKey={entreprise}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// const InternetBarChart = ({ data }) => {
//   if (!data.length) return null;

//   const lastYearData = data[data.length - 1];
//   const entreprises = Object.keys(lastYearData).filter(
//     (key) => key !== "annee"
//   );

//   return (
//     <div className="h-[400px] w-full">
//       <h3 className="text-lg font-semibold mb-2 text-center">
//         Répartition par opérateur ({lastYearData.annee})
//       </h3>
//       <ResponsiveContainer width="100%" height="90%">
//         <BarChart data={[lastYearData]} layout="vertical" margin={{ left: 40 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis type="number" />
//           <YAxis dataKey="annee" type="category" hide />
//           <Tooltip formatter={(value) => [`${value} abonnés`, "Nombre"]} />
//           <Legend />
//           {entreprises.map((entreprise, index) => (
//             <Bar
//               key={entreprise}
//               dataKey={entreprise}
//               fill={colors[index % colors.length]}
//               name={entreprise}
//               radius={[0, 4, 4, 0]}
//             />
//           ))}
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

const InternetBarChart = ({ data }) => {
  if (!data.length) return null;

  // On veut afficher l'évolution des abonnés par année (X = année, Y = nombre d'abonnés)
  // On va afficher un BarChart groupé par entreprise pour chaque année

  const entreprises = Object.keys(data[0]).filter((key) => key !== "annee");

  return (
    <div className="h-[400px] w-full ">
      <h3 className="text-lg font-semibold mb-2 text-center">
        Abonnés par opérateur et par année
      </h3>
      <ResponsiveContainer width="99%" height="90%">
        <BarChart data={data} margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="annee" />
          <YAxis
            label={{
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip formatter={(value) => [`${value} abonnés`, "Nombre"]} />
          <Legend />
          {entreprises.map((entreprise, index) => (
            <Bar
              key={entreprise}
              dataKey={entreprise}
              fill={colors[index % colors.length]}
              name={entreprise}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const AnalyseSection = ({ data }) => {
  if (!data.length) return null;

  const lastYear = data[data.length - 1];
  const firstYear = data[0];
  const entreprises = Object.keys(lastYear).filter((key) => key !== "annee");

  // Calcul des parts de marché
  const totalAbonnes = entreprises.reduce(
    (sum, entreprise) => sum + lastYear[entreprise],
    0
  );

  const partsMarche = entreprises.map((entreprise) => ({
    name: entreprise,
    value: (lastYear[entreprise] / totalAbonnes) * 100,
    abonnes: lastYear[entreprise],
  }));

  // Calcul des évolutions
  const evolutions = entreprises.map((entreprise) => {
    const evolution =
      ((lastYear[entreprise] - firstYear[entreprise]) / firstYear[entreprise]) *
      100;
    return {
      name: entreprise,
      evolution,
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Analyse du marché
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">
            Parts de marché ({lastYear.annee})
          </h4>
          <ul className="space-y-2">
            {partsMarche
              .sort((a, b) => b.value - a.value)
              .map((item) => (
                <li key={item.name} className="flex items-center">
                  <span className="w-32 font-medium">{item.name}</span>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div
                        className="h-4 bg-blue-500 rounded"
                        style={{ width: `${item.value}%` }}
                      ></div>
                      <span className="ml-2 text-sm text-gray-600">
                        {item.value.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.abonnes.toLocaleString()} abonnés
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">
            Évolution sur la période
          </h4>
          <ul className="space-y-2">
            {evolutions
              .sort((a, b) => b.evolution - a.evolution)
              .map((item) => (
                <li key={item.name} className="flex items-center">
                  <span className="w-32 font-medium">{item.name}</span>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span
                        className={`font-medium ${
                          item.evolution >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.evolution >= 0 ? "↑" : "↓"}{" "}
                        {Math.abs(item.evolution).toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      De {firstYear[item.name].toLocaleString()} à{" "}
                      {lastYear[item.name].toLocaleString()} abonnés
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const MarcheInternetChart = () => {
  const { internetFixeData, loading, error } = useMarcheInternetData();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Marché des Abonnements Internet Fixe
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

      {!loading && !error && internetFixeData.length > 0 && (
        <>
          <div className="grid md:grid-rows-2 gap-8">
            <div className="mb-6">
              <InternetLineChart data={internetFixeData} />
            </div>
            <InternetBarChart data={internetFixeData} />
          </div>
          <AnalyseSection data={internetFixeData} />
        </>
      )}
      <p className="mt-6 text-sm text-gray-400 text-right">
        Source : Ministère de l'Enseignement Supérieur et de la Recherche
        Scientifique
      </p>
    </div>
  );
};

export default MarcheInternetChart;
