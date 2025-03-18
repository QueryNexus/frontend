import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import "./styles/Queries.css";

function Queries() {
  const data = {
    labels: ['Critical, Solved, Unsolved'],
    datasets: [
      {
        label: '# of Flags',
        data: [10,10,10],
        backgroundColor: ['rgb(255, 0, 0)', 'rgb(0, 247, 0)', 'rgb(4, 0, 255)'],
        borderColor: ['rgb(255, 0, 0)', 'rgb(0, 247, 0)', 'rgb(4, 0, 255)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="queries-container">
      <div className="top">
        <Pie data={data} />
      </div>
      <div className="bottom">
        <div className="info-box">Information 1</div>
        <div className="info-box">Information 2</div>
        <div className="info-box">Information 3</div>
        <div className="info-box">Information 4</div>
        <div className="info-box">Information 1</div>
        <div className="info-box">Information 2</div>
        <div className="info-box">Information 3</div>
        <div className="info-box">Information 4</div>
      </div>
    </div>
  );
}

export default Queries;