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
    uid: user?.sub || "",
    name: "",
    industry: "",
    website: "",
    description: "",
    privacy_policy: "",
    terms_and_conditions: "",
    returnpolicy: "",
    services: [""],
    products: [""],
    services_provided_in: [""],
    board_members: {
      ceo: "",
      cto: "",
      cfo: "",
      cmo: "",
    },
    expected_service_time: "",
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

  // Handle Input Changes for Nested Fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 2) {
      setCompanyData((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else if (keys.length === 3) {
      setCompanyData((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: {
            ...prevState[keys[0]][keys[1]],
            [keys[2]]: value,
          },
        },
      }));
    } else {
      setCompanyData({
        ...companyData,
        [name]: value,
      });
    }
  };

  // Handle Array Input Changes
  const handleArrayChange = (index, name, value) => {
    setCompanyData((prevState) => {
      const updatedArray = [...prevState[name]];
      updatedArray[index] = value;
      return { ...prevState, [name]: updatedArray };
    });
  };

  // Handle Dynamic Key-Value Pair Input
  const handleOtherDetailsChange = (index, key, value) => {
    const updatedDetails = [...companyData.other_details];
    updatedDetails[index][key] = value;
    setCompanyData({ ...companyData, other_details: updatedDetails });
  };

  // Add New Array Entry
  const addArrayField = (name) => {
    setCompanyData({
      ...companyData,
      [name]: [...companyData[name], ""],
    });
  };

  // Add New Key-Value Pair in Other Details
  const addOtherDetailsField = () => {
    setCompanyData({
      ...companyData,
      other_details: [...companyData.other_details, { key: "", value: "" }],
    });
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
        {["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7"].map(
          (step, index) => (
            <div
              key={index}
              className={`progress-step ${currentStep >= index + 1 ? "active" : ""}`}
              onClick={() => setCurrentStep(index + 1)}
            >
              {step}
            </div>
          )
        )}
      </div>

      <form onSubmit={handleFormSubmit}>
        {/* Step 1 - Basic Info */}
        {currentStep === 1 && (
          <div>
            <h3>Step 1: Basic Information</h3>
            <div className="field-divs">
              <label>Company Name</label>
              <input
                type="text"
                name="name"
                value={companyData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field-divs">
              <label>Industry</label>
              <input
                type="text"
                name="industry"
                value={companyData.industry}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field-divs">
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={companyData.website}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Description</label>
              <textarea
                name="description"
                value={companyData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        {/* Step 2 - Contact & Location */}
        {currentStep === 2 && (
          <div>
            <h3>Step 2: Contact & Location</h3>
            <div className="field-divs">
              <label>Contact Email</label>
              <input
                type="email"
                name="contact.email"
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
                value={companyData.contact.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={companyData.location}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )}

        {/* Step 3 - Address & Board Members */}
        {currentStep === 3 && (
          <div>
            <h3>Step 3: Address & Board Members</h3>
            <div className="field-divs">
              <label>Street Address</label>
              <input
                type="text"
                name="address.street"
                value={companyData.address.street}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>City</label>
              <input
                type="text"
                name="address.city"
                value={companyData.address.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>State</label>
              <input
                type="text"
                name="address.state"
                value={companyData.address.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Country</label>
              <input
                type="text"
                name="address.country"
                value={companyData.address.country}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Postal Code</label>
              <input
                type="text"
                name="address.postal_code"
                value={companyData.address.postal_code}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>CEO Name</label>
              <input
                type="text"
                name="board_members.ceo"
                value={companyData.board_members.ceo}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>CTO Name</label>
              <input
                type="text"
                name="board_members.cto"
                value={companyData.board_members.cto}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>CFO Name</label>
              <input
                type="text"
                name="board_members.cfo"
                value={companyData.board_members.cfo}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>CMO Name</label>
              <input
                type="text"
                name="board_members.cmo"
                value={companyData.board_members.cmo}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Founded Year</label>
              <input
                type="text"
                name="founded_year"
                value={companyData.founded_year}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Company Size</label>
              <input
                type="text"
                name="company_size"
                value={companyData.company_size}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        {/* Step 4 - Policies & Services */}
        {currentStep === 4 && (
          <div>
            <h3>Step 4: Policies & Services</h3>
            <div className="field-divs">
              <label>Privacy Policy</label>
              <textarea
                name="privacy_policy"
                value={companyData.privacy_policy}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Services Provided in : </label>
              <textarea
                name="services_provided_in"
                value={companyData.services_provided_in}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Expected Service Time </label>
              <textarea
                name="expected_service_time"
                value={companyData.expected_service_time}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Terms & Conditions</label>
              <textarea
                name="terms_and_conditions"
                value={companyData.terms_and_conditions}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Return Policy</label>
              <textarea
                name="returnpolicy"
                value={companyData.returnpolicy}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        {/* Step 5 - Services, Products & Social Media */}
        {currentStep === 5 && (
          <div>
            <h3>Step 5: Services & Social Media</h3>
            {companyData.services.map((service, index) => (
              <div className="field-divs" key={index}>
                <label>Service {index + 1}</label>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => handleArrayChange(index, "services", e.target.value)}
                />
              </div>
            ))}
            <button style={{
              backgroundColor: "#007bff",
              color: "white",
              marginBottom: "10px"
            }} type="button" onClick={() => addArrayField("services")}>
              Add Service
            </button>

            <div className="field-divs">
              <label>LinkedIn Profile</label>
              <input
                type="text"
                name="social_media.linkedin"
                value={companyData.social_media.linkedin}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Twitter Handle</label>
              <input
                type="text"
                name="social_media.twitter"
                value={companyData.social_media.twitter}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Facebook</label>
              <input
                type="text"
                name="social_media.facebook"
                value={companyData.social_media.facebook}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Instagram</label>
              <input
                type="text"
                name="social_media.instagram"
                value={companyData.social_media.instagram}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        {/* Step 6 - Products & Additional Details */}
        {currentStep === 6 && (
          <div>
            <h3>Step 6: Products & Additional Info</h3>
            {companyData.products.map((product, index) => (
              <div className="field-divs" key={index}>
                <label>Product {index + 1}</label>
                <input
                  type="text"
                  value={product}
                  onChange={(e) => handleArrayChange(index, "products", e.target.value)}
                />
              </div>
            ))}
            <button style={{
              backgroundColor: "#007bff",
              color: "white",
              marginBottom: "10px"
            }} type="button" onClick={() => addArrayField("products")}>
              Add Product
            </button>

            {companyData.other_details.map((detail, index) => (
              <div className="field-divs" key={index}>
                <label>Other Detail Key</label>
                <input
                  type="text"
                  value={detail.key}
                  onChange={(e) =>
                    handleOtherDetailsChange(index, "key", e.target.value)
                  }
                />
                <label>Other Detail Value</label>
                <input
                  type="text"
                  value={detail.value}
                  onChange={(e) =>
                    handleOtherDetailsChange(index, "value", e.target.value)
                  }
                />
              </div>
            ))}
            <button style={{
              backgroundColor: "#007bff",
              color: "white",
              marginBottom: "10px"
            }} type="button" onClick={addOtherDetailsField}>
              Add More Details
            </button>
          </div>
        )}

        {/* Step 7 - Final Submission */}
        {currentStep === 7 && (
          <div>
            <h3>Step 7: Logo & Final Details</h3>
            <div className="field-divs">
              <label>Logo URL</label>
              <input
                type="text"
                name="logo_url"
                value={companyData.logo_url}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-divs">
              <label>Support Hours</label>
              <input
                type="text"
                name="support_hours"
                value={companyData.support_hours}
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
          {currentStep < 7 && (
            <button type="button" onClick={nextStep}>
              Next
            </button>
          )}
          {currentStep === 7 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
}

export default CreateCompany;
