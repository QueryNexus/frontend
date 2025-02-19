import React from 'react';
import "./../styles/AddSite.css"; // Create a separate CSS file for the AddSite styles

const AddSite = ({ showAddSite, handleCloseAddSite, handleFormSubmit, handleInputChange, newWebsite }) => {
  if (!showAddSite) return null;

  return (
    <div className="addSite-overlay">
      <div className="addSite-content">
        <h2>Add New Website</h2>
        <form onSubmit={handleFormSubmit}>
          <label>
            Website Name:
            <input type="text" name="name" value={newWebsite.name} onChange={handleInputChange} />
          </label>
          <label>
            Website URL:
            <input type="text" name="url" value={newWebsite.url} onChange={handleInputChange} />
          </label>
          <button type="button" onClick={handleCloseAddSite}>Close</button>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddSite;