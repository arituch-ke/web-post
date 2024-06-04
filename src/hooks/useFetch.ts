import { useState, useEffect } from "react";
import { useHttpClient } from "@/components/common/http-client-provider";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: { message: string } | null;
}

const useFetch = <T>(path: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);
  const httpClient = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get<never, T>(path);
        setData(response);
      } catch (error) {
        setError({
          message: "Oops! Something went wrong. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path, httpClient]);

  return { data, loading, error };
};

export default useFetch;
