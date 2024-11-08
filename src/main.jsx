import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App.jsx';
import Header from './components/header.jsx';
import { authConfig } from './authConfig'; // Ensure this path matches where you saved authConfig.js

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Header />
      <App />
    </Auth0Provider>
  </StrictMode>
);

