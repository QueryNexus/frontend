import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import logo from './../assets/logo.jpg';
import "./../styles/Navbar.css";
import { Link } from 'react-router-dom';

function Navbar() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [showLogout, setShowLogout] = useState(false);

    console.log(user);

    const handleImageClick = () => {
        setShowLogout(!showLogout);
    };
    
  return (
    <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="Logo" className="logo" />
            <p>QueryNexus</p>
        </div>

        <ul className="nav-menu">
            <li className="navbar-item"><Link to='/profile'>Profile</Link></li>

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
    </div>
  )
}

export default Navbar