// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import NavBar from './components/navbar/navbar';
import AppRoutes from './AppRoutes';
import SiteFooter from './components/footer/siteFooter';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
      <SiteFooter />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
