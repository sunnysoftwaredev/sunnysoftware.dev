import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.scss';
import { AuthProvider } from './context/AuthContext';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('Unexpected null root element');
}

const root = ReactDOM.createRoot(rootElement);
root.render((
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>
));
