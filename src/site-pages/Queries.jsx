import React, {useState, useEffect} from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import "./styles/Queries.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

function Queries() {
  // const [queryData, setQueryData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const { companyId } = useParams();

  // const chartData = {
  //   labels: ['Critical, Solved, Unsolved'],
  //   datasets: [
  //     {
  //       label: '# of Flags',
  //       data: [10,10,10],
  //       backgroundColor: ['rgb(255, 0, 0)', 'rgb(0, 247, 0)', 'rgb(4, 0, 255)'],
  //       borderColor: ['rgb(255, 0, 0)', 'rgb(0, 247, 0)', 'rgb(4, 0, 255)'],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.post(`https://backend-snowy-mu.vercel.app/query/${companyId}`);
  //       console.log('Query Data fetched successfully:', response.data);
  //       setQueryData(response.data.history);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // return (
  //   loading ? (<Loader />) : (
  //   <div className="queries-container">
  //     <div className="top">
  //       <Pie data={chartData} />
  //     </div>
      
  //     <div className="bottom">
  //       {loading ? (
  //         <div className="loader">Loading...</div>
  //       ) : (
  //         queryData.map((item, index) => (
  //           <div key={index} className="info-box">
  //             <p><strong>Role:</strong> {item.role}</p>
  //             <p><strong>Content:</strong> {item.content}</p>
  //             <p><strong>Timestamp:</strong> {new Date(item.timestamp.$date).toLocaleString()}</p>
  //           </div>
  //         ))
  //       )}
  //     </div>
  //   </div>
  //   )
  // );
}

export default Queries;