import { useEffect, useState } from "react";
import { fetchCovidData } from "../services/api";

export const useCovidData = () => {
  const [data, setData] = useState({
    rawData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const rawData = await fetchCovidData();
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
