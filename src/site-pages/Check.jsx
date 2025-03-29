import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaRobot,
  FaEdit,
  FaRocket,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import Loader from "./../components/Loader";

function Check() {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const { companyId } = useParams();

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async () => {
    if (!query.trim()) {
      setOutput("⚠️ Please enter a valid query.");
      return;
    }

    setLoading(true);
    setOutput(""); // Clear previous output

    try {
      const response = await axios.post(
        `https://backend-snowy-mu.vercel.app/query/${companyId}`,
        {
          query: query,
        }
      );
      console.log("Response from backend:", response.data);

      // Check if backend returns valid result
      setOutput(
        response.data.response.mailbody || "❗ No result returned from the backend."
      );
    } catch (error) {
      console.error("Error fetching query response:", error);
      setOutput("❌ An error occurred while processing your query.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800/80 p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-700">
        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center tracking-wide flex items-center justify-center gap-2">
          <FaRobot className="text-blue-400" /> Query Processor
        </h2>

        {/* Input Group */}
        <div className="mb-4">
          <label
            htmlFor="query-input"
            className="block text-lg font-medium text-gray-300 mb-2 flex items-center gap-2"
          >
            <FaEdit className="text-blue-400" />
            Enter Query:
          </label>
          <input
            type="text"
            id="query-input"
            value={query}
            onChange={handleQueryChange}
            placeholder="Type your query here..."
            className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Submit Button */}
        <button
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Processing...
            </>
          ) : (
            <>
              <FaRocket /> Submit Query
            </>
          )}
        </button>

        {/* Output Group */}
        <div className="mt-6">
          <label
            htmlFor="output-box"
            className="block text-lg font-medium text-gray-300 mb-2 flex items-center gap-2"
          >
            <FaCheckCircle className="text-green-400" />
            Output:
          </label>
          <textarea
            id="output-box"
            value={output}
            readOnly
            placeholder="Output will appear here..."
            rows={Math.max(5, output.split("\n").length)}
            className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Error/Warning Message */}
        {output.includes("⚠️") || output.includes("❌") || output.includes("❗") ? (
          <div className="mt-4 text-red-400 flex items-center gap-2 text-sm">
            <FaExclamationTriangle /> {output}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Check;
