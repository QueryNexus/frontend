import React, { useState, useEffect } from 'react';
import { Auth0Provider} from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Profile from './components/Profile.jsx';
import Loading from './components/Loading.jsx';
import SiteDashboard from './components/SiteDashboard.jsx';
import AddSite from './components/AddSite.jsx';

// import Landing from './components/Landing.jsx';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<Landing />}></Route> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/site-dashboard" element={<SiteDashboard/>} />
            <Route path="/add-site" element={<AddSite />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;