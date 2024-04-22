import ReactDOM from 'react-dom/client';

import { QueryClientProvider } from '@/components';
import { queryCache } from '@/lib';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider queryCache={queryCache}>
    <App />
  </QueryClientProvider>,
);
