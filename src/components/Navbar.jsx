import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import logo from './../assets/logo.jpg';
import "./../styles/Navbar.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Landing from './Landing';
import MainPage from './MainPage';
// import Profile from './Profile'; 

function Navbar() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [showLogout, setShowLogout] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    console.log(user);

    const handleImageClick = () => {
        setShowLogout(!showLogout);
    };

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    const handleProfileClick = () => {
      setProfileOpen(!profileOpen);
    }

    useEffect(() => {
      if (isAuthenticated && user){
        const userData = {
          uid: user.sub,
          email: user.email,
          name: user.name,
          photo: user.picture
        };
        axios.post('https://brwv0k8oof.execute-api.ap-south-1.amazonaws.com/development-deploy/user', userData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
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
              <p className="app-title">QueryNexus</p>
          </div>


          <button className="menu-button" onClick={toggleMenu}>
              ☰
          </button>

          <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
              {isAuthenticated && !profileOpen ? <li className="navbar-item" onClick={handleProfileClick}><Link to='/profile'>My Profile</Link></li> : <></>}

              {isAuthenticated && profileOpen ? <li className="navbar-item" onClick={handleProfileClick}><Link to='/'>Dashboard</Link></li> : <></>}

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
                        onClick={() => logout({ returnTo: window.location.origin })}
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

      {isAuthenticated && !profileOpen && (
        <MainPage />
      )}
    </>
  )
}

export default Navbar