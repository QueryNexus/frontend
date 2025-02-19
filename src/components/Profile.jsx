import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './../styles/Profile.css';

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
    picture: user?.picture || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Here you would typically send the updated user details to your backend
    console.log('Updated user details:', editedUser);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedUser({
      name: user?.name || '',
      email: user?.email || '',
      picture: user?.picture || '',
    });
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <img src={editedUser.picture} alt={editedUser.name} className="profile-picture" />
      <div className="profile-details">
        <label>
          Name:
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.name}</span>
          )}
        </label>
        <label>
          Email:
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </label>
      </div>
      {isEditing ? (
        <div className="profile-buttons">
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
}

export default Profile;