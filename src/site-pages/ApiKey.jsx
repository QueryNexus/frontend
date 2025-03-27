import React from 'react';
import "./styles/ApiKey.css";

const apiDetails = [
  { name: 'API Key', url: 'https://querynexus-snowy-mu.vercel.app', description: 'This is the api key that will be used by company to use querynexus services.' }
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