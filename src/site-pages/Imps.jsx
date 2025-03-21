import React from 'react';
import "./styles/Imps.css";

const queries = [
  { queryName: 'Query 1', response: 'Response for Query 1' },
  { queryName: 'Query 2', response: 'Response for Query 2' },
  { queryName: 'Query 3', response: 'Response for Query 3' },
  { queryName: 'Query 4', response: 'Response for Query 4' },
  // Add more queries as needed
];

function IMPS() {
  return (
    <div className="info">
      <h1>Important Flagged Queries</h1>
      <div className="queries-container">
        {queries.map((query, index) => (
          <div key={index} className="query-info">
            <h2>{query.queryName}</h2>
            <button onClick={() => alert(query.response)}>View Response</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IMPS;