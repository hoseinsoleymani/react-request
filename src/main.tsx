import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClientProvider } from './components/QueryClient.tsx';
import { queryCache } from './lib';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider queryCache={queryCache}>
    <App />
  </QueryClientProvider>,
);
