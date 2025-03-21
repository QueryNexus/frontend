import React from 'react';
import "./styles/ApiKey.css";

const apiDetails = [
  { name: 'API 1', url: 'https://api1.example.com', description: 'Description for API 1' },
  { name: 'API 2', url: 'https://api2.example.com', description: 'Description for API 2' },
  { name: 'API 3', url: 'https://api3.example.com', description: 'Description for API 3' },
  // Add more API details as needed
];

function APIKey() {
  return (
    <div className="api-keys-container">
      {apiDetails.map((api, index) => (
        <div key={index} className="api-info">
          <h2>{api.name}</h2>
          <p>URL: <a href={api.url} target="_blank" rel="noopener noreferrer">{api.url}</a></p>
          <p>{api.description}</p>
        </div>
      ))}
    </div>
  );
}

export default APIKey;