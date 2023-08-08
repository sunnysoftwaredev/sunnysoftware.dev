import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('Unexpected null root element');
}

const root = ReactDOM.createRoot(rootElement);
root.render(<StrictMode>
  <Router>
    <App />
  </Router>
</StrictMode>);
