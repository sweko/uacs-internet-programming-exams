import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse, Method } from "axios";
import { IData, IFetchOptions } from "./CommonInterfaces";

const useFetchData = ({ objectName, method, body }: IFetchOptions) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IData[]>([]);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.example.com/${objectName}`;
      setIsLoading(true);
      try {
        let res: AxiosResponse;
        if (method === "GET" || method === "DELETE") {
          res = await axios({ url, method });
        } else if (method === "POST" || method === "PATCH") {
          res = await axios({ url, method, data: body });
        } else {
          throw new Error("Unsupported method");
        }
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
