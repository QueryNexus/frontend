import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import logo from './../assets/logo.jpg';
import "./../styles/Navbar.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Landing from './Landing';
import MainPage from './MainPage';

function Navbar() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [showLogout, setShowLogout] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    console.log(user);

    const handleImageClick = () => {
        setShowLogout(!showLogout);
    };

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    useEffect(() => {
      if (isAuthenticated && user){
        axios.post('http://localhost:3000/api/user', user)
          .then(response => {
            console.log('User data sent successfully:', response.data);
          })
          .catch(error => {
            console.error('Error sending user data:', error);
          });
      }
    }, [isAuthenticated, user]);  
    
  return (
    <>
      <div className="navbar">
          <div className="nav-logo">
              <img src={logo} alt="Logo" className="logo" />
              <p>QueryNexus</p>
          </div>


          <button className="menu-button" onClick={toggleMenu}>
              ☰
          </button>

          <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
              {isAuthenticated ? <li className="navbar-item"><Link to='/profile'>My Profile</Link></li> : <></>}

              <li className="navbar-item">
                {isAuthenticated ? (
                  <>
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="user-image"
                      onClick={handleImageClick}
                    />
                    {showLogout && (
                      <button
                        onClick={() => logout({ returnTo: "https://querynexus.netlify.app/" })}
                        className="logout-button"
                      >
                        Logout
                      </button>
                    )}
                  </>
                ) : (
                  <button onClick={() => loginWithRedirect()} className="login-button">
                    Login
                  </button>
                )}
              </li>
          </ul>
      </div>

      {!isAuthenticated && (
        <Landing />
      )}

      {isAuthenticated && (
        <MainPage />
      )}
    </>
  )
}

export default Navbar