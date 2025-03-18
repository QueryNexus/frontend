import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MyCompany from './site-pages/MyCompany';
import Queries from './site-pages/Queries';
import IMPS from './site-pages/Imps';
import APIKey from './site-pages/ApiKey';
import "./../styles/SiteDashboard.css";

function SiteDashboard() {
  const location = useLocation();
  const initialSite = location.state.site;
  const [site, setSite] = useState(initialSite);
  const [activeNavItem, setActiveNavItem] = useState('My Company');

  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
  };

  return (
    <div className="site-dashboard">
      <div className="left-navbar">
        <ul className="nav-items">
          <li
            className={`nav-item ${activeNavItem === 'My Company' ? 'active' : ''}`}
            onClick={() => handleNavItemClick('My Company')}
          >
            My Company
          </li>
          <li
            className={`nav-item ${activeNavItem === 'Queries' ? 'active' : ''}`}
            onClick={() => handleNavItemClick('Queries')}
          >
            Queries
          </li>
          <li
            className={`nav-item ${activeNavItem === 'IMPS' ? 'active' : ''}`}
            onClick={() => handleNavItemClick('IMPS')}
          >
            IMPS
          </li>
          <li
            className={`nav-item ${activeNavItem === 'API Key' ? 'active' : ''}`}
            onClick={() => handleNavItemClick('API Key')}
          >
            API Key
          </li>
        </ul>
      </div>

      <div className="right-content">
        {activeNavItem === 'My Company' && <MyCompany site={site} setSite={setSite} />}
        {activeNavItem === 'Queries' && <Queries />}
        {activeNavItem === 'IMPS' && <IMPS />}
        {activeNavItem === 'API Key' && <APIKey />}
      </div>
    </div>
  );
}

export default SiteDashboard;