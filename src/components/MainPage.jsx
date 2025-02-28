import React, {useState, useEffect} from 'react';
import "./../styles/MainPage.css";
import user_image from "./../assets/user_image.png";
import axios from 'axios';
import AddSite from './AddSite';
import CreateCompany from './CreateCompany';

function MainPage() {
  const [showAddSite, setShowAddSite] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [companyData, setCompanyData] = useState(null);

  // const [showSite, setShowSite] = useState(false);

  const handleAddButtonClick = () => {
    setShowAddSite(true);
  };

  const handleCloseAddSite = () => {
    setShowAddSite(false);
  };

  useEffect(() => {
    axios.get('http://localhost:8080/user')
      .then(response => {
        console.log(response.data);
        if (response.data.isCompany) {
          setIsCompany(true);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleCompanyData = (data) => {
    setCompanyData(data);
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
        <div className="top">
          <img src={user_image} alt="user image" className="user-logo"/>
          
          <div className="user-info">
            <p>Company Name : XYZ</p>
            <p>Company Address : XYZ city</p>
            <p>Company Email : xyz@vscode.com</p>
          </div>
        </div>

        <div className="bottom">
          <p>My Websites</p>
          <ul>
            {websites.map((website, index) => (
              <li key={index} id="sites">
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
      </div>
      )}

      {!isCompany && <CreateCompany onSuccess={handleCompanyData}/>}
    </>
  )
}

export default MainPage