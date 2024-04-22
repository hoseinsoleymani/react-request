import type { PropsWithChildren } from 'react';
import { createContext, useMemo } from 'react';

import type { QueryCache } from '../utils/QueryCache';

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
