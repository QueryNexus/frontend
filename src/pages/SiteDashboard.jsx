import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyCompany from "./site-pages/MyCompany";
import Queries from "./site-pages/Queries";
import IMPS from "./site-pages/Imps";
import APIKey from "./site-pages/ApiKey";
import "./../styles/SiteDashboard.css";
import axios from "axios";

function SiteDashboard() {
  // const location = useLocation();
  // const initialSite = location.state.site;
  const [site, setSite] = useState({
    id: "",
    name: "",
    website: "",
    description: ""
  });
  const [activeNavItem, setActiveNavItem] = useState("My Company");
  const { id } = useParams();
  console.log(id);

  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the backend with the id as data
        const response = await axios.get(`http://localhost:8080/company/67bcd1080c9cb95d46c85c8a`);
        console.log('Request sent successfully:', response.data);
        const { id, name, website, description } = response.data.company;
        
        setSite((prevSite) => ({
          ...prevSite, // spread the previous state
          id: id,
          name: name, // update the name
          website: website,
          description: description
        }));
        console.log(site);
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    site != null ? (
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
    ) : (
      <></>
    )
  );
}

export default SiteDashboard;
