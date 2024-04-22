import ReactDOM from 'react-dom/client';

import App from './App';
import { QueryClientProvider } from './components/QueryClient';
import { queryCache } from './lib';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider queryCache={queryCache}>
    <App />
  </QueryClientProvider>,
);
