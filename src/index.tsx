import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "react-query";
import {PresentationProvider} from "./context/PresentationContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <PresentationProvider>
                    <App/>
                </PresentationProvider>
            </QueryClientProvider>
        </BrowserRouter>,
    </React.StrictMode>
);
reportWebVitals();
