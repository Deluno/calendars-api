import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from '@/app/data/source/api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
