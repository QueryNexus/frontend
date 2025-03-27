import React, { useState } from "react";
import axios from "axios";
import "./styles/Check.css";

function Check() {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async () => {
    if (!query.trim()) {
      setOutput("Please enter a query.");
      return;
    }

    setLoading(true);
    setOutput(""); // Clear previous output

    try {
      // Replace with your backend endpoint
      const response = await axios.post(`https://backend-snowy-mu.vercel.app/query/${companyId}`, {
        query: query,
      });

      // Assuming the backend returns the result in `response.data.result`
      setOutput(response.data.result || "No result returned from the backend.");
    } catch (error) {
      console.error("Error fetching query response:", error);
      setOutput("An error occurred while processing your query.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="check-container">
      <h2>Query Processor</h2>
      <div className="input-group">
        <label htmlFor="query-input">Enter Query:</label>
        <input
          type="text"
          id="query-input"
          value={query}
          onChange={handleQueryChange}
          placeholder="Type your query here..."
        />
      </div>
      <button className="submit-button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Submit Query"}
      </button>
      <div className="output-group">
        <label htmlFor="output-box">Output:</label>
        <textarea
          id="output-box"
          value={output}
          readOnly
          placeholder="Output will appear here..."
        />
      </div>
    </div>
  );
}

export default Check;