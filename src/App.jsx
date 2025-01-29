import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import Home from './components/Home.jsx';
import './App.css';
import authConfig from './config/auth_config.json';

function App() {

  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      redirectUri={window.location.origin}
    >
    <div className="container">
      <Home />
    </div>
    </Auth0Provider>
  )
}

export default App
