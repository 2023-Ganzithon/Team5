import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { worker } from 'mocks/browsers';
import App from 'App';
import ScrollToTop from '@components/ScrollToTop';

// if (process.env.NODE_ENV === 'development') {
//   worker.start();
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
