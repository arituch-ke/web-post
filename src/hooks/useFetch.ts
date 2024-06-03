import { useState, useEffect } from "react";
import axios from "axios";
import httpClient from "@/utils/httpClient";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: { message: string } | null;
}

const useFetch = <T>(path: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get<T>(path);
        setData(response.data);
      } catch (error) {
        setError({
          message: "Oops! Something went wrong. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { data, loading, error };
};

export default useFetch;
