import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import logo from './../assets/logo.jpg';
import "./../styles/Navbar.css";

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

      

  return (
    <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="Logo" className="logo" />
            <p className="app-title">QueryNexus</p>
        </div>

        <button className="menu-button" onClick={toggleMenu}>
            ☰
        </button>

        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            {/* {isAuthenticated && !profileOpen ? <li className="navbar-item" onClick={handleProfileClick}><Link to='/dashboard'>My Profile</Link></li> : <></>}

            {isAuthenticated && profileOpen ? <li className="navbar-item" onClick={handleProfileClick}><Link to='/'>Dashboard</Link></li> : <></>} */}

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
  )
}

export default Navbar