import React, {useState, useEffect} from 'react';
import "./../styles/MainPage.css";
import user_image from "./../assets/user_image.png";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import AddSite from './AddSite';
import CreateCompany from './CreateCompany';
import SiteDashboard from './SiteDashboard';

function MainPage() {
  const { user, isAuthenticated } = useAuth0();
  const [showAddSite, setShowAddSite] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [companyData, setCompanyData] = useState({id: '', name: ''});
  const [selectedSite, setSelectedSite] = useState(null);

  // const [showSite, setShowSite] = useState(false);

  const handleAddButtonClick = () => {
    setShowAddSite(true);
  };

  const handleCloseAddSite = () => {
    setShowAddSite(false);
  };

  const handleSiteClick = (site) => {
    setSelectedSite(site);
  };

  useEffect(() => {
    axios.post('https://brwv0k8oof.execute-api.ap-south-1.amazonaws.com/development-deploy/usercompany', {uid:user.sub})
      .then(response => {
        console.log(response.data);
        if (response.data.companyIds && response.data.companyIds.length > 0) {
          setIsCompany(true);
          setCompanyData({
            id: response.data.companyIds[0]._id,
            name: response.data.companyIds[0].name
          });
          console.log("company data : ", companyData);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [isAuthenticated, user]);

  const handleCompanyData = (data) => {
    setCompanyData({
      id: data.companyIds[0]._id,
      name: data.companyIds[0].name
    });
    console.log('Company data:', data);
    setIsCompany(true);
  };


  const [websites, setWebsites] = useState([
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'ChatGPT', url: 'https://chat.openAI.com' },
    { name: 'Youtube', url: 'https://m.youtube.com' },
    { name: 'Docs', url: 'https://docs.google.com' },
  ]);

  const [newWebsite, setNewWebsite] = useState({ name: '', url: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWebsite({ ...newWebsite, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the new website entry to the backend
      const response = await axios.post('http://localhost:8080/newSite', newWebsite);
      console.log('Response from backend:', response.data);

      // Update the state with the new website entry
      setWebsites([...websites, newWebsite]);
      setNewWebsite({ name: '', url: '' });
      setShowAddSite(false);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <>
      {isCompany && (
      <div className="main-page">
        {/* Render SiteDashboard if a site is selected */}
        {selectedSite ? (
          <SiteDashboard siteName={selectedSite.name} />
        ) : (
          <>
            <div className="top">
              <img src={user_image} alt="user image" className="user-logo"/>
              <div className="user-info">
                <p>Company ID : {companyData.id}</p>
                <p>Company Name : {companyData.name}</p>
                <p>Company Address : XYZ city</p>
                <p>Company Email : xyz@vscode.com</p>
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

            <button class="cssbuttons-io-button" onClick={handleAddButtonClick}>
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

            <AddSite
              showAddSite={showAddSite}
              handleCloseAddSite={handleCloseAddSite}
              handleFormSubmit={handleFormSubmit}
              handleInputChange={handleInputChange}
              newWebsite={newWebsite}
            />
          </>
        )}
      </div>
      )}

      {!isCompany && <CreateCompany onSuccess={handleCompanyData}/>}
    </>
  )
}

export default MainPage