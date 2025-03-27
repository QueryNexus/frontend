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
  const { companyId } = useParams();

  const [chartData, setChartData] = useState({
    labels: ["Resolved", "Unresolved", "Critical"],
    datasets: [
      {
        label: "# of Queries",
        data: [0, 0, 0], // Initial data
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

      // Update query data
      setQueryData(response.data.queries);

      // Update chart data based on categories
      const resolvedCount = response.data.queries.filter(
        (item) => item.category === "Resolved"
      ).length;
      const unresolvedCount = response.data.queries.filter(
        (item) => item.category === "Unresolved"
      ).length;
      const criticalCount = response.data.queries.filter(
        (item) => item.category === "Critical"
      ).length;

      setChartData({
        labels: ["Resolved", "Unresolved", "Critical"],
        datasets: [
          {
            label: "# of Queries",
            data: [resolvedCount, unresolvedCount, criticalCount],
            backgroundColor: ["rgb(0, 247, 0)", "rgb(255, 0, 0)", "rgb(4, 0, 255)"],
            borderColor: ["rgb(0, 247, 0)", "rgb(255, 0, 0)", "rgb(4, 0, 255)"],
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

  return loading ? (
    <Loader />
  ) : (
    <div className="queries-container">
      <div className="top">
        <h2>Query Statistics</h2>
        <Pie data={chartData} />
      </div>

      <div className="bottom">
        <h2>Query Details</h2>
        {queryData.length === 0 ? (
          <p>No queries found.</p>
        ) : (
          queryData.map((item, index) => (
            <div key={index} className="info-box">
              <p>
                <strong>Query:</strong> {item.query}
              </p>
              <p>
                <strong>Response:</strong> {item.response}
              </p>
              <p>
                <strong>Category:</strong> {item.category}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Queries;