import React, { useState, useEffect } from 'react';
import "./../styles/MainPage.css";
import user_image from "./../assets/user_image.png";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const { user, isAuthenticated } = useAuth0();
  const [isCompany, setIsCompany] = useState(false);
  const [companyData, setCompanyData] = useState({ id: '', name: '', sites: ''});
  const [websites, setWebsites] = useState([
    { id: 1, name: 'Google', url: 'https://www.google.com', description: 'Search engine' },
    { id: 2, name: 'ChatGPT', url: 'https://chat.openAI.com', description: 'AI chatbot' },
    { id: 3, name: 'Youtube', url: 'https://m.youtube.com', description: 'Video platform' },
    { id: 4, name: 'Docs', url: 'https://docs.google.com', description: 'Document editor' },
  ]);

  const navigate = useNavigate();

  const handleSiteClick = (site) => {
    console.log("Site to send : ",site)
    navigate(`/site-dashboard/${site.id}`);
  };

  const handleAddSiteClick = () => {
    navigate('/add-site');
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.post('http://localhost:8080/usercompany', { uid: user.sub });
        console.log("Checked User Company : ", response.data);
        if (response.data.companyIds && response.data.companyIds.length > 0) {
          setIsCompany(true);
          setCompanyData({
            id: response.data.companyIds[0]._id,
            name: response.data.companyIds[0].name
          });
          console.log("Company ids : ", companyData)
        }
        else {
          navigate('/create-company');
        }
      }
      catch(error){
        console.error('Error fetching user data:', error);
      }
  };
  if (isAuthenticated) {
    fetchData();
  }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="main-page">
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
            <li key={index} id="sites" onClick={() => handleSiteClick(website)}>
              {website.name} : <a href={website.url} target="_blank" rel="noopener noreferrer">{website.url}</a>
            </li>
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
}

export default MainPage;