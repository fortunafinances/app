import React from "react";
import ReactDOM from "react-dom/client";
// import Select from "react-select";
// import { BrowserRouter } from 'react-router-dom'
import App from "./App.tsx";
import { Auth0Provider } from '@auth0/auth0-react';
// import { Auth0ProviderWithHistory } from './auth0-provider-with-history.tsx'
import "../index.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <Auth0Provider domain="dev-wpc8kymxzmepqxl5.us.auth0.com"
      clientId="OxQxuofsPZXSFzTqbVtKgErT2xrl3VfZ"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      {/* <Auth0ProviderWithHistory > */}
      <App /></Auth0Provider>
    {/* </Auth0ProviderWithHistory> */}
    {/* </BrowserRouter> */}
  </React.StrictMode >
);
