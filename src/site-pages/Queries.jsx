import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

function Queries() {
  const [queryData, setQueryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { companyId } = useParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // 🎯 Fixed Categories List
  const categoryOptions = [
    "High Priority",
    "Follow-Up Required",
    "Resolved",
    "Duplicate Query",
    "Needs Escalation",
    "Spam",
    "Feedback/Compliment",
  ];

  const [chartData, setChartData] = useState({
    labels: categoryOptions,
    datasets: [
      {
        label: "# of Queries",
        data: Array(categoryOptions.length).fill(0), // Initialize with zeros
        backgroundColor: categoryOptions.map(
          (_, index) => `hsl(${(index * 360) / categoryOptions.length}, 70%, 50%)`
        ),
        borderColor: categoryOptions.map(
          (_, index) => `hsl(${(index * 360) / categoryOptions.length}, 70%, 40%)`
        ),
        borderWidth: 1,
      },
    ],
  });

  // 🚀 Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://backend-snowy-mu.vercel.app/query/${companyId}`
      );
      console.log("Query Data fetched successfully:", response.data.queries);

      // Filter data only with relevant categories
      const validQueries = response.data.queries.filter((item) =>
        categoryOptions.includes(item.category)
      );

      setQueryData(validQueries);

      // Count category occurrences for Pie Chart
      const categoryCounts = categoryOptions.map(
        (category) => validQueries.filter((item) => item.category === category).length
      );

      // Update Chart Data
      setChartData({
        labels: categoryOptions,
        datasets: [
          {
            label: "# of Queries",
            data: categoryCounts,
            backgroundColor: categoryOptions.map(
              (_, index) =>
                `hsl(${(index * 360) / categoryOptions.length}, 70%, 50%)`
            ),
            borderColor: categoryOptions.map(
              (_, index) =>
                `hsl(${(index * 360) / categoryOptions.length}, 70%, 40%)`
            ),
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 📚 Toggle Read More / Less
  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // 🎯 Handle Category Selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  // 🔍 Filtered Data Based on Selected Categories
  const filteredQueryData =
    selectedCategories.length === 0
      ? queryData
      : queryData.filter((item) => selectedCategories.includes(item.category));

  return loading ? (
    <Loader />
  ) : (
    <div className="text-white min-h-screen">
      {/* Top Section - Pie Chart */}
      <div className="mb-8 bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-blue-400 mb-6 tracking-wide">
          📊 Query Statistics
        </h2>
        <div className="flex justify-center">
          <div className="w-72 md:w-96">
            <Pie data={chartData} />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-700 mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-blue-400">
          🎯 Filter by Category
        </h3>
        <div className="flex flex-wrap gap-4">
          {categoryOptions.map((category, index) => (
            <label
              key={index}
              className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-300 ${
                selectedCategories.includes(category)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }`}
            >
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="hidden"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Query Details Section */}
      <div className="bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-blue-400 mb-6">📚 Query Details</h2>
        {filteredQueryData.length === 0 ? (
          <p className="text-lg text-gray-400">No queries found for the selected category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredQueryData.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300"
              >
                <p className="text-lg mb-2">
                  <strong className="text-blue-500">Query:</strong> {item.query}
                </p>
                <p className="text-gray-300 mb-2">
                  <strong className="text-blue-500">Response:</strong>{" "}
                  {expandedIndex === index
                    ? item.response
                    : `${item.response.substring(0, 100)}...`}
                  <span
                    className="text-blue-400 ml-2 cursor-pointer hover:underline"
                    onClick={() => toggleReadMore(index)}
                  >
                    {expandedIndex === index ? "Show Less" : "Read More"}
                  </span>
                </p>
                <p className="text-gray-400 mb-2">
                  <strong className="text-blue-500">Category:</strong> {item.category}
                </p>
                <p className="text-gray-400">
                  <strong className="text-blue-500">Created At:</strong>{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Queries;
