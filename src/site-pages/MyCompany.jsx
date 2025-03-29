import React, { useState } from "react";
import {
  FaSave,
  FaEdit,
  FaLink,
  FaBuilding,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

function MyCompany({ site, setSite }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    name: site.name,
    url: site.website,
    description: site.description,
  });

  // Handle Edit Mode
  const handleEditClick = () => setIsEditing(true);

  // Save Changes
  const handleSaveClick = () => {
    setSite(editedDetails);
    setIsEditing(false);
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({
      ...editedDetails,
      [name]: value,
    });
  };

  return (
    <div className="w-full h-full p-8 bg-gray-900 text-white">
      {/* Main Content Wrapper */}
      <div className="w-full max-w-3xl mx-auto">
        {isEditing ? (
          <>
            {/* Editable Fields */}
            <div className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <FaBuilding className="text-blue-500 mr-3 text-2xl" />
                <div className="w-full">
                  <label className="block text-lg font-semibold mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editedDetails.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex items-center mb-4">
                <FaLink className="text-green-500 mr-3 text-2xl" />
                <div className="w-full">
                  <label className="block text-lg font-semibold mb-1">
                    Website URL
                  </label>
                  <input
                    type="text"
                    name="url"
                    value={editedDetails.url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex items-start mb-6">
                <FaInfoCircle className="text-yellow-500 mr-3 text-2xl mt-1" />
                <div className="w-full">
                  <label className="block text-lg font-semibold mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editedDetails.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleSaveClick}
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
                >
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
                >
                  <FaTimes className="mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Display Mode */}
            <div className="space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl border border-gray-700">
              {/* Name */}
              <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-md shadow-sm hover:shadow-lg transition-all duration-300">
                <FaBuilding className="text-blue-500 text-2xl" />
                <div>
                  <p className="text-lg font-semibold text-white">Company Name</p>
                  <p className="text-gray-300">{site.name}</p>
                </div>
              </div>

              {/* URL */}
              <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-md shadow-sm hover:shadow-lg transition-all duration-300">
                <FaLink className="text-green-500 text-2xl" />
                <div>
                  <p className="text-lg font-semibold text-white">Website URL</p>
                  <a
                    href={site.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300 transition-all duration-300"
                  >
                    {site.website}
                  </a>
                </div>
              </div>

              {/* Description */}
              <div className="flex items-start space-x-4 bg-gray-800 p-4 rounded-md shadow-sm hover:shadow-lg transition-all duration-300">
                <FaInfoCircle className="text-yellow-500 text-2xl mt-1" />
                <div>
                  <p className="text-lg font-semibold text-white">Description</p>
                  <p className="text-gray-300">{site.description}</p>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={handleEditClick}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg w-full"
              >
                <FaEdit className="mr-2" />
                Edit Details
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyCompany;
