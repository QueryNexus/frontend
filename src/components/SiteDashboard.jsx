import React from 'react';

function SiteDashboard({ siteName }) {
  return (
    <div className="site-dashboard">
      <h1>Site Dashboard</h1>
      <p>Site Name: {siteName}</p>
      {/* Add more details and functionalities for the site dashboard here */}
    </div>
  );
}

export default SiteDashboard;