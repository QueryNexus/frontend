import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import logo from "./../assets/logo.jpg";

const Navbar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [navbarShadow, setNavbarShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full py-4 px-6 flex justify-between items-center bg-gray-900 text-gray-200 transition-all ${
        navbarShadow ? "shadow-lg shadow-gray-800" : ""
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
        <a href="/" className="text-xl font-bold text-white">
          QueryNexus
        </a>
      </div>

      {/* Menu for Large Screens */}
      {!isAuthenticated && (
        <ul className="hidden md:flex space-x-6">
          <NavItem href="#features" label="Features" />
          <NavItem href="#about" label="About" />
          <NavItem href="#contact" label="Contact" />
        </ul>
      )}

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <div className="relative">
            <img
              src={user.picture}
              alt={user.name}
              className="h-10 w-10 rounded-full cursor-pointer border-2 border-blue-500"
              onClick={() => setShowLogout(!showLogout)}
            />
            {showLogout && (
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="absolute right-0 mt-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
              >
                <FiLogOut />
                Logout
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg transition-all"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 py-4 flex flex-col items-center space-y-4 shadow-lg md:hidden">
          {!isAuthenticated && (
            <>
              <NavItem href="#features" label="Features" />
              <NavItem href="#about" label="About" />
              <NavItem href="#contact" label="Contact" />
            </>
          )}
          {isAuthenticated ? (
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="bg-red-600 px-6 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 text-white rounded-lg transition-all"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ href, label }) => (
  <li>
    <a
      href={href}
      className="text-gray-300 hover:text-blue-400 transition-all"
    >
      {label}
    </a>
  </li>
);

export default Navbar;
