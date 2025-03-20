import React, { useState, useEffect } from 'react';
import "./../styles/MainPage.css";
import user_image from "./../assets/user_image.png";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import Loader from "./../components/Loader";

function MainPage() {
  const { user, isAuthenticated } = useAuth0();
 const [websites, setWebsites] = useState([]);
 const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSiteClick = (site) => {
    navigate(`/site-dashboard/${site._id}`);
  };

  const handleAddSiteClick = () => {
    navigate('/add-site');
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        setLoading(true);
        const response = await axios.post('https://backend-snowy-mu.vercel.app/usercompany', { uid: user.sub });
        console.log("Checked User Company : ", response.data);
        
        if (response.data.companyIds && response.data.companyIds.length > 0) {
          setWebsites(response.data.companyIds);
        }
        else {
          navigate('/create-company');
        }
      }
      catch(error){
        console.error('Error fetching user data:', error);
      }
      finally{
        setLoading(false);
      }
  };
  if (isAuthenticated) {
    fetchData();
  }
  }, [isAuthenticated, user, navigate]);

  return (
    loading ? (<Loader />) : 
    (<div className="main-page">
      <div className="top">
        <img src={user_image} alt="user image" className="user-logo" />
        <div className="user-info">
          <p>User ID : {user.sub}</p>
          <p>Name : {user.name}</p>
          <p>Email : {user.email}</p>
        </div>
      </div>

      <div className="bottom">
        <p>My Websites</p>
        <ul>
          {websites.map((website, index) => (
            <li key={index} id="sites" >
              {website.name} <button onClick={() => handleSiteClick(website)} >View More</button> </li>
          ))}
        </ul>
      </div>

      <button className="cssbuttons-io-button" onClick={handleAddSiteClick}>
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
        </svg>
        <span>Add</span>
      </button>
    </div>
    )
  )
}

export default MainPage;