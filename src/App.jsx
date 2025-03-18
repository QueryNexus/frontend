import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";
import AddSite from './pages/AddSite';
import CreateCompany from './pages/CreateCompany';
import SiteDashboard from './pages/SiteDashboard';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? element : <Navigate to="/" />;
};

const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();
  return !isAuthenticated ? element : <Navigate to="/dashboard" />;
};


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicRoute element={<Landing />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<MainPage />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/add-site" element={<ProtectedRoute element={<AddSite />} />} />
        <Route path="/create-company" element={<ProtectedRoute element={<CreateCompany />} />} />
        <Route path="/site-dashboard" element={<ProtectedRoute element={<SiteDashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App
