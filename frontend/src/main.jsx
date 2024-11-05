import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { CustomToastContainer } from './components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
      <CustomToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
