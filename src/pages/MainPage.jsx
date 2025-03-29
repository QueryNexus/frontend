import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Loader from "./../components/Loader";
import { FaGlobe } from "react-icons/fa";
import user_image from "./../assets/user_image.png"; // ✅ Local image

const MainPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSiteClick = (site) => {
    navigate(`/site-dashboard/${site._id}`);
  };

  const handleAddSiteClick = () => {
    navigate("/create-company");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://backend-snowy-mu.vercel.app/usercompany",
          { uid: user.sub }
        );
        console.log("Checked User Company : ", response.data);

        if (response.data.companyIds && response.data.companyIds.length > 0) {
          setWebsites(response.data.companyIds);
        } else {
          navigate("/create-company");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, user, navigate]);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white font-poppins pt-24 px-4">
      {/* Top User Info Section */}
      <div className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-8 mb-10 flex flex-col md:flex-row items-center gap-6">
        {/* User Image */}
        <img
          src={user.picture || user_image} // ✅ Use local image as fallback
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
        />
        {/* User Info */}
        <div className="text-center md:text-left w-full">
          <p className="text-lg font-semibold mb-2">
            <span className="text-gray-400">User ID:</span>{" "}
            <span className="text-white">{user.sub}</span>
          </p>
          <p className="text-lg font-semibold mb-2">
            <span className="text-gray-400">Name:</span>{" "}
            <span className="text-white">{user.name}</span>
          </p>
          <p className="text-lg font-semibold">
            <span className="text-gray-400">Email:</span>{" "}
            <span className="text-white">{user.email}</span>
          </p>
        </div>
      </div>

      {/* My Websites Section */}
      <div className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-8 mb-10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          My Websites
        </h2>
        {websites.length > 0 ? (
          <ul className="space-y-4">
            {websites.map((website, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all"
              >
                <div className="flex items-center gap-3">
                  <FaGlobe className="text-teal-400" />
                  <span className="text-lg font-semibold text-white">
                    {website.name}
                  </span>
                </div>
                <button
                  onClick={() => handleSiteClick(website)}
                  className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition-all"
                >
                  View More
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">No websites found!</p>
        )}
      </div>

      {/* Add Button with New Style */}
      <button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2 transition-all"
        onClick={handleAddSiteClick}
      >
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
        </svg>
        <span className="text-lg font-semibold">Add</span>
      </button>
    </div>
  );
};

export default MainPage;
