import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import logo from './../assets/logo.jpg';
import "./../styles/Navbar.css";
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Navbar() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [showLogout, setShowLogout] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();

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
      const getUserData = async() => {
        if (isAuthenticated && user){
          const userData = {
            uid: user.sub,
            email: user.email,
            name: user.name,
            photo: user.picture
          };

          try{
            const response = await axios.post('http://localhost:8080/user', userData, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            console.log('User data sent successfully:', response.data);
            navigate('/dashboard');
          }
          catch (error) {
            console.error('Error sending user data:', error);
          }
        }
      };

      getUserData();
    }, [isAuthenticated, user, navigate]);
      

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