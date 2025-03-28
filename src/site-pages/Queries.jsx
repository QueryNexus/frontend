import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./styles/Queries.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

function Queries() {
  const [queryData, setQueryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState([]);
  const { companyId } = useParams();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [chartData, setChartData] = useState({
    labels: ["Resolved", "Unresolved", "Critical"],
    datasets: [
      {
        label: "# of Queries",
        data: [0, 0, 0],
        backgroundColor: ["rgb(0, 247, 0)", "rgb(255, 0, 0)", "rgb(4, 0, 255)"],
        borderColor: ["rgb(0, 247, 0)", "rgb(255, 0, 0)", "rgb(4, 0, 255)"],
        borderWidth: 1,
      },
    ],
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://backend-snowy-mu.vercel.app/query/${companyId}`
      );
      console.log("Query Data fetched successfully:", response.data.queries);
      const uniqueCategories = [
        ...new Set(response.data.queries.map((item) => item.category)),
      ];
      setLabels(uniqueCategories);
      setQueryData(response.data.queries);

      const categoryCounts = uniqueCategories.map((category) =>
        response.data.queries.filter((item) => item.category === category).length
      );

      setChartData({
        labels: uniqueCategories,
        datasets: [
          {
            label: "# of Queries",
            data: categoryCounts,
            backgroundColor: uniqueCategories.map((_, index) =>
              `hsl(${(index * 360) / uniqueCategories.length}, 70%, 50%)`
            ),
            borderColor: uniqueCategories.map((_, index) =>
              `hsl(${(index * 360) / uniqueCategories.length}, 70%, 40%)`
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

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const filteredQueryData =
    selectedCategories.length === 0
      ? queryData
      : queryData.filter((item) => selectedCategories.includes(item.category));

      return loading ? (
        <Loader />
      ) : (
        <div className="queries-container">
          <div className="top">
            <h2>Query Statistics</h2>
            <Pie data={chartData} />
          </div>
      
          <div className="bottom">
            <div className="filter-section">
              <h3>Filter by Category</h3>
              <div className="checkbox-container">
                {labels.map((category, index) => (
                  <label key={index} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>
      
            <h2>Query Details</h2>
            {filteredQueryData.length === 0 ? (
              <p>No queries found.</p>
            ) : (
              <div className="query-cards-container">
                {filteredQueryData.map((item, index) => (
                  <div key={index} className="info-box">
                    <p>
                      <strong>Query:</strong> {item.query}
                    </p>
                    <p>
                      <strong>Response:</strong>{" "}
                      {expandedIndex === index
                        ? item.response
                        : `${item.response.substring(0, 100)}...`}{" "}
                      <span
                        className="read-more"
                        onClick={() => toggleReadMore(index)}
                      >
                        {expandedIndex === index ? "Show Less" : "Read More"}
                      </span>
                    </p>
                    <p>
                      <strong>Category:</strong> {item.category}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
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