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

  const handleBranchChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBranches = companyData.other_branches.map((branch, i) =>
      i === index ? { ...branch, [name]: value } : branch
    );
    setCompanyData({ ...companyData, other_branches: updatedBranches });
  };

  const addBranch = () => {
    setCompanyData((prevState) => ({
      ...prevState,
      other_branches: [
        ...prevState.other_branches,
        { name: "", address: "", contact: "" },
      ],
    }));
  };

  const removeBranch = (index) => {
    const updatedBranches = companyData.other_branches.filter(
      (_, i) => i !== index
    );
    setCompanyData({ ...companyData, other_branches: updatedBranches });
  };

  const handleOtherDetailsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = companyData.other_details.map((detail, i) =>
      i === index ? { ...detail, [name]: value } : detail
    );
    setCompanyData({ ...companyData, other_details: updatedDetails });
  };

  const addOtherDetail = () => {
    setCompanyData((prevState) => ({
      ...prevState,
      other_details: [...prevState.other_details, { key: "", value: "" }],
    }));
  };

  const removeOtherDetail = (index) => {
    const updatedDetails = companyData.other_details.filter(
      (_, i) => i !== index
    );
    setCompanyData({ ...companyData, other_details: updatedDetails });
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
      navigate('/dashboard');
    } catch (error) {
      console.error("Error sending company data:", error);
      alert("Error sending company data. Please try again.");
    } finally{ 
      setLoading(false);
    }
  };

  return (
    loading ? <Loader /> : 
    (<div className="create-company">
      <h2>Create Company</h2>

      <form onSubmit={handleFormSubmit}>
        <div className="field-divs">
          <label>User ID</label>
          <input
            placeholder="User ID (Read-Only)"
            type="text"
            name="uid"
            value={companyData.uid}
            readOnly
          />
        </div>

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

        <div className="field-divs">
        <label>Website</label>
        <input
          type="text"
          name="website"
          placeholder="Enter Website URL"
          value={companyData.website}
          onChange={handleInputChange}
        />
        </div>

        <div className="field-divs">
        <label>Description</label>
        <input
          type="text"
          name="description"
          placeholder="Enter Company Description"
          value={companyData.description}
          onChange={handleInputChange}
        />
        </div>

        <div className="field-divs">
        <label>Privacy Policy</label>
        <input
          type="text"
          name="privacy_policy"
          placeholder="Enter Privacy Policy"
          value={companyData.privacy_policy}
          onChange={handleInputChange}
        />  
        </div>

        <div className="field-divs">
        <label>Services Offered</label>
        <input
          type="text"
          name="services"
          placeholder="Enter Services Offered"
          value={companyData.services}
          onChange={handleInputChange}
        />
        </div>

        <div className="field-divs">
        <label>Terms and Conditions</label>
        <input
          type="text"
          name="terms_and_conditions"
          placeholder="Enter Terms and Conditions"
          value={companyData.terms_and_conditions}
          onChange={handleInputChange}
        />
        </div>

        <div className="field-divs">
        <label>Founded Year</label>
        <input
          type="number"
          name="founded_year"
          placeholder="Enter Year Founded"
          value={companyData.founded_year}
          onChange={handleInputChange}
        />
        </div>

        <div className="field-divs">
        <label>Company Size</label>
        <select className="select-box"
          name="company_size"
          value={companyData.company_size}
          onChange={handleInputChange}
        >
          <option value="">Select Company Size</option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-200">51-200</option>
          <option value="201-500">201-500</option>
          <option value="501-1000">501-1000</option>
          <option value="1000+">1000+</option>
        </select>
        </div>

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

        <div className="field-divs">
        <label>Country</label>
        <input
          type="text"
          name="address.country"
          placeholder="Enter Country"
          value={companyData.address.country}
          onChange={handleInputChange}
        />
        </div>

        <div className="field-divs">
        <label>Postal Code</label>
        <input
          legend="Postal Code"
          type="text"
          name="address.postal_code"
          placeholder="Enter Postal Code"
          value={companyData.address.postal_code}
          onChange={handleInputChange}
        />
        </div>

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

        <div className="field-divs">
        <label>Facebook Profile</label>
        <input
          type="text"
          name="social_media.facebook"
          placeholder="Enter Facebook Profile URL"
          value={companyData.social_media.facebook}
          onChange={handleInputChange}
        />
        </div>

        <div className="field-divs">
        <label>Instagram Handle</label>
        <input
          type="text"
          name="social_media.instagram"
          placeholder="Enter Instagram Handle"
          value={companyData.social_media.instagram}
          onChange={handleInputChange}
        />
        </div>

        <div className="field-divs">
        <label>Support Hours</label>
        <input
          type="text"
          name="support_hours"
          placeholder="Enter Support Hours"
          value={companyData.support_hours}
          onChange={handleInputChange}
        />
        </div>

        <div className="field-divs">
        <label>Location</label>
        <input
          type="text"
          name="location"
          placeholder="Enter Location"
          value={companyData.location}
          onChange={handleInputChange}
          required
        />
        </div>

        <div className="field-divs">
        {companyData.other_branches.map((branch, index) => (
          <div key={index} className="branch">
            <label>Branch Name</label>
            <input
              type="text"
              name="name"
              placeholder="Branch Name"
              value={branch.name}
              onChange={(e) => handleBranchChange(index, e)}
            />

            <label>Branch Address</label>
            <input
              type="text"
              name="address"
              placeholder="Branch Address"
              value={branch.address}
              onChange={(e) => handleBranchChange(index, e)}
            />

            <label>Branch Contact</label> 
            <input
              type="text"
              name="contact"
              placeholder="Branch Contact"
              value={branch.contact}
              onChange={(e) => handleBranchChange(index, e)}
            />

            <button type="button" onClick={() => removeBranch(index)}>
              Remove Branch
            </button>

            <button type="button" onClick={addBranch}>
              Add Branch
            </button>
          </div>
        ))}
        </div>

        <div className="field-divs">
        <label>Logo URL</label>
        <input
          type="text"
          name="logo_url"
          placeholder="Enter Logo URL"
          value={companyData.logo_url}
          onChange={handleInputChange}
        />
        </div>


        <div className="field-divs">
        {companyData.other_details.map((detail, index) => (
          <div key={index} className="other-detail">
            <label>Parameter {index}</label>
            <input
              type="text"
              name="key"
              placeholder="Enter Detail Key"
              value={detail.key}
              onChange={(e) => handleOtherDetailsChange(index, e)}
            />

            <label>Value {index}</label>
            <input
              type="text"
              name="value"
              placeholder="Enter Detail Value"
              value={detail.value}
              onChange={(e) => handleOtherDetailsChange(index, e)}
            />

            <button type="button" onClick={() => removeOtherDetail(index)}>
              Remove Detail
            </button>

            <button type="button" onClick={addOtherDetail}>
              Add Detail
            </button>
          </div>
        ))}
        </div>

        <button type="submit">Create Company</button>
      </form>
    </div>
    )
  );
}

export default CreateCompany;
