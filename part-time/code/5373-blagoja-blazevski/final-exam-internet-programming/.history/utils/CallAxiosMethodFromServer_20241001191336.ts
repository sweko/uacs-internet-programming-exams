import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface IData {
  [key: string]: any;
}

// Custom hook that fetches data and returns the states
const useFetchData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IData[]>([]);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://api.example.com/data");
        setData(res.data);
        setStatus(res.status);
        setError(null);
      } catch (err: AxiosError | any) {
        setData([]);
        setStatus(err.response?.status || 500);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, data, status, error };
};

export default useFetchData;
