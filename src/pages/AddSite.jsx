import React, { useState } from 'react';
import axios from 'axios';
import "./../styles/AddSite.css";
import { useNavigate } from 'react-router-dom';

// { websites, setWebsites }
function AddSite() {
  const [newWebsite, setNewWebsite] = useState({ name: '', url: '', description: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWebsite({ ...newWebsite, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the new website entry to the backend
      const response = await axios.post('https://backend-snowy-mu.vercel.app/newSite', newWebsite);
      console.log('Response from backend:', response.data);

      // Update the state with the new website entry
      setWebsites([...websites, newWebsite]);
      setNewWebsite({ name: '', url: '', description: '' });
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
    navigate(-1);
  };

  const handleCloseAddSite = () => {
    navigate(-1);
  };

  return (
    <div className="add-site-modal">
        <h1>Add a new site</h1>
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                name="name"
                value={newWebsite.name}
                onChange={handleInputChange}
                placeholder="Website Name"
                required
            />
            <input
                type="url"
                name="url"
                value={newWebsite.url}
                onChange={handleInputChange}
                placeholder="Website URL"
                required
            />
            <input
                type="text"
                name="description"
                value={newWebsite.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
            />
            <button type="submit">Add Website</button>
            <button type="button" onClick={handleCloseAddSite}>Cancel</button>
        </form>
    </div>
  );
}

export default AddSite;