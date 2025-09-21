// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css'; // <-- 在这里添加这一行

const queryClient = new QueryClient();

const rootElement = document.getElementById('root')!;

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
);