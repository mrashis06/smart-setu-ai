import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext'; // ✅ import UserProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider> {/* ✅ Wrap entire app in UserProvider */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
