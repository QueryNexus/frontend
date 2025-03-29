import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyCompany from "./../site-pages/MyCompany";
import Queries from "./../site-pages/Queries";
import APIKey from "./../site-pages/ApiKey";
import Check from "./../site-pages/Check";
import Loader from "./../components/Loader";
import axios from "axios";
import {
  FaBuilding,
  FaQuestionCircle,
  FaKey,
  FaSearch,
} from "react-icons/fa";

function SiteDashboard() {
  const [site, setSite] = useState({
    id: "",
    name: "",
    website: "",
    description: "",
  });
  const [activeNavItem, setActiveNavItem] = useState("My Company");
  const { companyId } = useParams();
  const [loading, setLoading] = useState(true);

  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://backend-snowy-mu.vercel.app/company/${companyId}`
        );
        console.log("Request sent successfully:", response.data);
        const { id, name, website, description } = response.data;

        setSite({
          id: id,
          name: name,
          website: website,
          description: description,
        });
      } catch (error) {
        console.error("Error sending data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      console.log("id:", companyId);
      fetchData();
    }
  }, [companyId]);

  const navItems = [
    { name: "My Company", icon: <FaBuilding className="mr-2" /> },
    { name: "Queries", icon: <FaQuestionCircle className="mr-2" /> },
    { name: "API Key", icon: <FaKey className="mr-2" /> },
    { name: "Test Query", icon: <FaSearch className="mr-2" /> },
  ];

  return loading ? (
    <Loader />
  ) : (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gray-800 fixed left-0 top-19.5 h-[calc(100vh-64px)] shadow-lg z-50">
        <ul className="mt-8 space-y-4 px-4">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center cursor-pointer text-lg font-medium text-gray-300 px-4 py-3 rounded-md transition-all duration-300 ${
                activeNavItem === item.name
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => handleNavItemClick(item.name)}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area (Dynamic Content Only) */}
      <div className="flex-1 fixed right-6 top-20 bottom-6 left-72 overflow-y-auto p-4">
        {/* Render Corresponding Component Directly */}
        {activeNavItem === "My Company" && (
          <MyCompany site={site} setSite={setSite} />
        )}
        {activeNavItem === "Queries" && <Queries />}
        {activeNavItem === "API Key" && <APIKey />}
        {activeNavItem === "Test Query" && <Check />}
      </div>
    </div>
  );
}

export default SiteDashboard;
