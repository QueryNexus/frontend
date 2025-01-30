import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Profile from './components/Profile.jsx';
import './App.css';
import authConfig from './config/auth_config.json';

function App() {
  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;