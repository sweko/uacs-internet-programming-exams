import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook that fetches data and returns the states
const useFetchData = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
        setStatus(res.status);
        setError(null);
      } catch (err) {
        setData([]);
        setStatus(err.response?.status || 500);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, data, status, error };
};

export default useFetchData;
