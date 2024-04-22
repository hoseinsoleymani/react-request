import type { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useQueryCache } from '@/components';
import { client } from '@/lib';

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
  const queryCache = useQueryCache();

  const sendRequest = () => {
    setLoading(true);

    return client
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
      });
  };

  useEffect(() => {
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
      queryCache.update(queryKey, sendRequest());
    }
  }, [queryCache, queryKey, requestOptions, url]);

  useEffect(() => {
    queryCache.attach({
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

  const refetch = useCallback(() => {
    queryCache.update(queryKey, sendRequest());
  }, [queryKey, url]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}
