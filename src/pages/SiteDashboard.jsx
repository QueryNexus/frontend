import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MyCompany from "./site-pages/MyCompany";
import Queries from "./site-pages/Queries";
import IMPS from "./site-pages/Imps";
import APIKey from "./site-pages/ApiKey";
import "./../styles/SiteDashboard.css";

function SiteDashboard() {
  // const location = useLocation();
  // const initialSite = location.state.site;
  const [site, setSite] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState("My Company");
  const { id } = useParams();
  console.log(id);

  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
  };

  // useEffect(() => {
  //   // Make a GET request to the backend with the id as data
  //   axios.get(`https://brwv0k8oof.execute-api.ap-south-1.amazonaws.com/development-deploy/company/67bcd1080c9cb95d46c85c8a`)
  //     .then(response => {
  //       console.log('Request sent successfully:', response.data);
  //       setSite(response.data); // Assuming the response contains the site data
  //     })
  //     .catch(error => {
  //       console.error('Error sending data:', error);
  //     });
  // }, [companyId]);

  return (
    <div className="site-dashboard">
      <div className="left-navbar">
        <ul className="nav-items">
          <li
            className={`nav-item ${
              activeNavItem === "My Company" ? "active" : ""
            }`}
            onClick={() => handleNavItemClick("My Company")}
          >
            My Company
          </li>
          <li
            className={`nav-item ${
              activeNavItem === "Queries" ? "active" : ""
            }`}
            onClick={() => handleNavItemClick("Queries")}
          >
            Queries
          </li>
          <li
            className={`nav-item ${activeNavItem === "IMPS" ? "active" : ""}`}
            onClick={() => handleNavItemClick("IMPS")}
          >
            IMPS
          </li>
          <li
            className={`nav-item ${
              activeNavItem === "API Key" ? "active" : ""
            }`}
            onClick={() => handleNavItemClick("API Key")}
          >
            API Key
          </li>
        </ul>
      </div>

      <div className="right-content">
        {activeNavItem === "My Company" && (
          <MyCompany site={site} setSite={setSite} />
        )}
        {activeNavItem === "Queries" && <Queries />}
        {activeNavItem === "IMPS" && <IMPS />}
        {activeNavItem === "API Key" && <APIKey />}
      </div>
    </div>
  );
}

export default SiteDashboard;
