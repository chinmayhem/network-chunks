import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

