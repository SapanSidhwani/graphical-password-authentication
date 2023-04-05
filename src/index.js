// "both": "concurrently \"npm run start\" \"nodemon backend/index.js\" " => look: package.json
// npm i concurrently react-router-dom 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);