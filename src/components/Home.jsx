import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './../styles/Home.css';
import logo from './../assets/logo.jpg';

function Home() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [showLogout, setShowLogout] = useState(false);

  const handleImageClick = () => {
    setShowLogout(!showLogout);
  };

  return (
    <>
      <div className="left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="right">
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item"><a href="#home">Home</a></li>
            <li className="navbar-item"><a href="#about">About</a></li>
            <li className="navbar-item"><a href="#services">Services</a></li>
            <li className="navbar-item"><a href="#contact">Contact</a></li>
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
                    <>
                    <button
                      onClick={() => logout({ returnTo: window.location.origin })}
                      className="logout-button"
                    >
                      Logout
                    </button>
                    
                    <li className="navbar-item"><a href="#profile">My Profile</a></li>
                    </>
                  )}
                </>
              ) : (
                <button onClick={() => loginWithRedirect()} className="login-button">
                  Login
                </button>
              )}
            </li>
          </ul>
        </nav>
        {isAuthenticated && <p>Welcome, {user.email}</p>}
      </div>
    </>
  );
}

export default Home;