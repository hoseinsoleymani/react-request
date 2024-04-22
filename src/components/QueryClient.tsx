import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { QueryCache } from '@/utils';

export const QueryCacheContext = createContext<{
  queryCache: QueryCache | null;
}>({
  queryCache: null,
});

interface QueryClientProviderProps {
  queryCache: QueryCache;
}

export const QueryClientProvider = ({
  children,
  queryCache,
}: PropsWithChildren<QueryClientProviderProps>) => {
  const queryCacheValue = useMemo(() => {
    return { queryCache };
  }, []);

  return (
    <QueryCacheContext.Provider value={queryCacheValue}>
      {children}
    </QueryCacheContext.Provider>
  );
};

export const useQueryCache = () => {
  const { queryCache } = useContext(QueryCacheContext);

  if (!queryCache) throw Error("The query cache wasn't found");

  return queryCache;
};
