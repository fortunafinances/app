import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
// import { Auth0Provider } from '@auth0/auth0-react';
import { Auth0ProviderWithHistory } from './auth0-provider-with-history.tsx'
import '../index.css'


// const auth0Config = config.AUTH0;
// const domain = auth0Config.DOMAIN; 
// const clientId = auth0Config.CLIENT_ID; 
// const clientSecret = auth0Config.CLIENT_SECRET;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory >
        <App />
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode >
);
