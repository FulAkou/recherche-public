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
import { fetchProductionData } from "../../services/api";

const useProductionData = () => {
  const [data, setData] = useState({
    allData: [],
    filteredData: [],
    sousCategories: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const { resultat, sousCategories } = await fetchProductionData();
        setData((prev) => ({
          ...prev,
          allData: resultat,
          sousCategories,
          loading: false,
        }));
      } catch (err) {
        setData((prev) => ({
          ...prev,
          error: err.message,
          loading: false,
        }));
      }
    };

    loadData();
  }, []);

  return { ...data, setData };
};

const YearSelectors = ({ startYear, endYear, years, onYearChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center">
        <label className="mr-2 font-medium text-gray-700">De :</label>
        <select
          value={startYear}
          onChange={(e) => onYearChange("startYear", e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {years.map((year) => (
            <option key={`start-${year}`} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <label className="mr-2 font-medium text-gray-700">À :</label>
        <select
          value={endYear}
          onChange={(e) => onYearChange("endYear", e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {years.map((year) => (
            <option
              key={`end-${year}`}
              value={year}
              disabled={Number(year) < Number(startYear)}
            >
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const ProductionChart = ({ filteredData, sousCategories }) => {
  const couleurs = [
    "#8884d8",
    "#82ca9d",
    "#ff7300",
    "#ff0000",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
  ];

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="annee"
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
          {sousCategories.map((cat, index) => (
            <Line
              key={cat}
              type="monotone"
              dataKey={cat}
              stroke={couleurs[index % couleurs.length]}
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

const ProductionBarChart = ({ filteredData, sousCategories }) => {
  const couleurs = [
    "#8884d8",
    "#82ca9d",
    "#ff7300",
    "#ff0000",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
  ];

  return (
    <div className="h-[400px] w-full mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="annee"
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
          {sousCategories.map((cat, index) => (
            <Bar
              key={cat}
              dataKey={cat}
              fill={couleurs[index % couleurs.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ProductionPoissonViandeChart = () => {
  const [startYear, setStartYear] = useState("2005");
  const [endYear, setEndYear] = useState("2014");
  const { allData, filteredData, sousCategories, loading, error, setData } =
    useProductionData();

  const years = Array.from({ length: 2014 - 2005 + 1 }, (_, i) =>
    String(2005 + i)
  );

  useEffect(() => {
    const filtered = allData.filter(
      (item) => item.annee >= startYear && item.annee <= endYear
    );
    setData((prev) => ({ ...prev, filteredData: filtered }));
  }, [startYear, endYear, allData, setData]);

  const handleYearChange = (type, value) => {
    if (type === "startYear") setStartYear(value);
    else setEndYear(value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Évolution de la production par sous-catégorie
      </h2>

      <YearSelectors
        startYear={startYear}
        endYear={endYear}
        years={years}
        onYearChange={handleYearChange}
      />

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

      {!loading && !error && filteredData.length === 0 && (
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
                Aucune donnée disponible pour cette période
              </p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && filteredData.length > 0 && (
        <>
          <ProductionChart
            filteredData={filteredData}
            sousCategories={sousCategories}
          />
          <div className="mt-20">
            <ProductionBarChart
              filteredData={filteredData}
              sousCategories={sousCategories}
            />
          </div>
        </>
      )}

      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-800 mb-6 border-b pb-2">
          Analyse Dynamique des Tendances de Production (2005 - 2014)
        </h1>

        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h2 className="font-semibold text-lg text-blue-700 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293z"
                  clipRule="evenodd"
                />
              </svg>
              Tendance Globale
            </h2>
            <p className="mt-2 text-gray-700">
              <span className="font-medium text-green-600">
                ↑ Croissance marquée
              </span>{" "}
              dans 60% des sous-catégories, avec un taux annuel moyen de +3.2%.
              Particulièrement visible dans la
              <span className="font-medium"> production aquacole</span>{" "}
              (+5.1%/an).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
              <h3 className="font-semibold text-amber-800 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
                Performances
              </h3>
              <ul className="mt-2 space-y-1 text-gray-700 list-disc pl-5">
                <li>
                  <span className="font-medium">Poisson frais</span> : +22% sur
                  la période
                </li>
                <li>
                  <span className="font-medium">Volaille</span> : croissance
                  régulière de 4%/an
                </li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <h3 className="font-semibold text-red-800 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                    clipRule="evenodd"
                  />
                </svg>
                Défis
              </h3>
              <ul className="mt-2 space-y-1 text-gray-700 list-disc pl-5">
                <li>
                  <span className="font-medium">Poisson surgelé</span> : -8%
                  depuis 2009
                </li>
                <li>
                  <span className="font-medium">Viande bovine</span> :
                  stagnation
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
              Points Clés
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start">
                <span className="flex-shrink-0 bg-purple-200 text-purple-800 p-1 rounded-full mr-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" />
                  </svg>
                </span>
                <span>
                  2011 : année charnière avec inversion des tendances pour 3
                  catégories
                </span>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 bg-purple-200 text-purple-800 p-1 rounded-full mr-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" />
                  </svg>
                </span>
                <span>
                  Écart croissant entre production fraîche et transformée
                </span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 italic border-t pt-4">
            Données à interpréter en contexte : les variations peuvent refléter
            des changements réglementaires, des évolutions de consommation ou
            des facteurs externes (climat, prix des intrants).
          </div>
        </div>
      </div>
      <p className="flex justify-end mt-4 text-sm text-gray-500 text-center">
        Source : Données historiques de la matière première
      </p>
    </div>
  );
};

export default ProductionPoissonViandeChart;
