import React, { useState } from 'react';

function MyCompany({ site, setSite }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    name: site.name,
    url: site.url,
    description: site.description,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setSite(editedDetails);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({
      ...editedDetails,
      [name]: value,
    });
  };

  return (
    <div className="info">
      <h1>Company Details</h1>
      {isEditing ? (
        <>
          <p>
            Name: <input type="text" name="name" value={editedDetails.name} onChange={handleInputChange} />
          </p>
          <p>
            URL: <input type="text" name="url" value={editedDetails.url} onChange={handleInputChange} />
          </p>
          <p>
            Description: <input type="text" name="description" value={editedDetails.description} onChange={handleInputChange} />
          </p>
          <button className="save-button" onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <p>Name: {site.name}</p>
          <p>URL: <a href={site.website} target="_blank" rel="noopener noreferrer">{site.website}</a></p>
          <p>Description: {site.description}</p>
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
}

export default MyCompany;