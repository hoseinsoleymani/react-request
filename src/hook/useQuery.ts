import type { AxiosRequestConfig } from 'axios';
import { useContext, useEffect, useState } from 'react';

import { QueryCacheContext } from '../components/QueryClient';
import { client } from '../lib';

interface UseQueryOptions {
  url: string;
  queryKey: string;
  requestOptions?: AxiosRequestConfig;
}

export function useQuery<TData = unknown>(options: UseQueryOptions) {
  const { queryKey, url, requestOptions } = options;
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { queryCache } = useContext(QueryCacheContext);

  useEffect(() => {
    if (!queryCache) return;

    if (queryCache.has(queryKey)) {
      queryCache
        .get(queryKey)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      setLoading(true);

      queryCache.update(
        queryKey,
        client
          .get<TData>(url, { ...requestOptions })
          .then((res) => {
            setLoading(false);
            setData(res.data);
            return res;
          })
          .catch((err) => {
            setLoading(false);
            setError(err);

            queryCache.delete(queryKey);
            return err;
          }),
      );
    }
  }, [queryCache, queryKey, requestOptions, url]);

  useEffect(() => {
    if (!queryCache) return;

    return queryCache.attach({
      update: (key, value) => {
        if (key === queryKey)
          value
            .then((res) => {
              setData(res.data);
            })
            .catch((err) => {
              setError(err);
            });
      },
    });
  }, []);

  function refetch() {
    if (!queryCache) return;

    setLoading(true);

    queryCache.update(
      queryKey,
      client
        .get(url, { ...requestOptions })
        .then((res) => {
          setLoading(false);
          setData(res.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);

          return err;
        }),
    );
  }

  return {
    data,
    loading,
    error,
    refetch,
  };
}
