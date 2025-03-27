import { useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import MainPage from "./pages/MainPage";
import CreateCompany from './pages/CreateCompany';
import SiteDashboard from './pages/SiteDashboard';
import axios from 'axios';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? element : <Navigate to="/" />;
};

const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();
  return !isAuthenticated ? element : <Navigate to="/dashboard" />;
};

function App() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
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
          const response = await axios.post('https://backend-snowy-mu.vercel.app/user', userData, {
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
  }, [isAuthenticated, user]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicRoute element={<Landing />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<MainPage />} />} />
        {/* <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} /> */}
        <Route path="/create-company" element={<ProtectedRoute element={<CreateCompany />} />} />
        <Route path="/site-dashboard/:companyId" element={<ProtectedRoute element={<SiteDashboard />} />} />
      </Routes>
    </>
  );
}

export default App
