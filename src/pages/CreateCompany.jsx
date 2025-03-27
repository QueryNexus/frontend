import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/CreateCompany.css";
import { useNavigate } from "react-router-dom";
import Loader from "./../components/Loader";

function CreateCompany() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [companyData, setCompanyData] = useState({
    uid: user.sub,
    name: "",
    legal_name: "",
    industry: "",
    website: "",
    description: "",
    privacy_policy: "",
    services: "",
    terms_and_conditions: "",
    founded_year: "",
    company_size: "",
    contact: {
      email: "",
      phone: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
    },
    social_media: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
    support_hours: "",
    location: "",
    other_branches: [
      {
        name: "",
        address: "",
        contact: "",
      },
    ],
    logo_url: "",
    other_details: [{ key: "", value: "" }],
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setCompanyData((prevState) => ({
        ...prevState,
        uid: user.sub,
      }));
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setCompanyData((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setCompanyData({ ...companyData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(companyData);
    try {
      setLoading(true);
      const response = await axios.post(
        "https://backend-snowy-mu.vercel.app/company",
        companyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Company data sent successfully:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error sending company data:", error);
      alert("Error sending company data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="create-company">
      <h2>Create Company</h2>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className={`progress-step ${currentStep >= 1 ? "active" : ""}`}
          onClick={() => setCurrentStep(1)}
        >
          Step 1
        </div>
        <div
          className={`progress-step ${currentStep >= 2 ? "active" : ""}`}
          onClick={() => setCurrentStep(2)}
        >
          Step 2
        </div>
        <div
          className={`progress-step ${currentStep >= 3 ? "active" : ""}`}
          onClick={() => setCurrentStep(3)}
        >
          Step 3
        </div>
        <div
          className={`progress-step ${currentStep >= 4 ? "active" : ""}`}
          onClick={() => setCurrentStep(4)}
        >
          Step 4
        </div>
      </div>

      <form onSubmit={handleFormSubmit}>
        {currentStep === 1 && (
          <div>
            <h3>Step 1: Basic Information</h3>
            <div className="field-divs">
              <label>Company Name</label>
              <input
                placeholder="Enter Company Name"
                type="text"
                name="name"
                value={companyData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field-divs">
              <label>Legal Name</label>
              <input
                type="text"
                name="legal_name"
                placeholder="Enter Legal Name"
                value={companyData.legal_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Industry</label>
              <input
                type="text"
                name="industry"
                placeholder="Enter Industry Type"
                value={companyData.industry}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3>Step 2: Contact Information</h3>
            <div className="field-divs">
              <label>Contact Email</label>
              <input
                type="email"
                name="contact.email"
                placeholder="Enter Contact Email"
                value={companyData.contact.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field-divs">
              <label>Contact Phone</label>
              <input
                type="text"
                name="contact.phone"
                placeholder="Enter Contact Phone"
                value={companyData.contact.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3>Step 3: Address</h3>
            <div className="field-divs">
              <label>Street Address</label>
              <input
                type="text"
                name="address.street"
                placeholder="Enter Street Address"
                value={companyData.address.street}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>City</label>
              <input
                type="text"
                name="address.city"
                placeholder="Enter City"
                value={companyData.address.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>State</label>
              <input
                type="text"
                name="address.state"
                placeholder="Enter State"
                value={companyData.address.state}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3>Step 4: Social Media</h3>
            <div className="field-divs">
              <label>LinkedIn Profile</label>
              <input
                type="text"
                name="social_media.linkedin"
                placeholder="Enter LinkedIn Profile URL"
                value={companyData.social_media.linkedin}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Twitter Handle</label>
              <input
                type="text"
                name="social_media.twitter"
                placeholder="Enter Twitter Handle"
                value={companyData.social_media.twitter}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        <div className="form-navigation">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep}>
              Previous
            </button>
          )}
          {currentStep < 4 && (
            <button type="button" onClick={nextStep}>
              Next
            </button>
          )}
          {currentStep === 4 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
}

export default CreateCompany;