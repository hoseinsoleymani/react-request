import { useEffect, useState } from "react";
import { client } from "../lib";
import {AxiosRequestConfig} from "axios"
import { QueryCache } from "../utils/observer";

interface UseQueryOptions {
  url: string;
  queryKey: string;
  requestOptions?: AxiosRequestConfig
}

const queryCache = new QueryCache();

export function useQuery(options: UseQueryOptions) {
  const { queryKey, url, requestOptions } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (queryCache.has(queryKey)) {
      queryCache.get(queryKey).then((res) => {
        setData(res.data);
      });
    } else {
      setLoading(true);


      queryCache.update(queryKey, client
        .get(url, { ...requestOptions })
        .then((res) => {
          setLoading(false);
          setData(res.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err); 
        }));
    }
  }, [queryKey, requestOptions, url]);

  useEffect(() => {
    return queryCache.attach({
      update: (key, value) => {
        if (key === queryKey) setData(value);
      },
    });
  }, []);

  function refetch() {
    if (queryCache.has(queryKey)) {
      setLoading(true)

      queryCache.update(queryKey, client
        .get(url, { ...requestOptions })
        .then((res) => {
          setLoading(false);
          setData(res.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        }))
    }
  }

  return {
    data,
    loading,
    error,
    refetch,
  };
}