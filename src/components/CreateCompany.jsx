import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import "./../styles/CreateCompany.css";

function CreateCompany({onSuccess}) {
  const { user, isAuthenticated } = useAuth0();
  const [companyData, setCompanyData] = useState({
    uid: user.sub,
    name: '',
    legal_name: '',
    industry: '',
    website: '',
    description: '',
    privacy_policy: '',
    services: '',
    terms_and_conditions: '',
    founded_year: '',
    company_size: '',
    contact: {
      email: '',
      phone: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      postal_code: ''
    },
    social_media: {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    },
    support_hours: '',
    location: '',
    other_branches: [
      {
        name: '',
        address: '',
        contact: ''
      }
    ],
    logo_url: '',
    other_details: [
      { key: '', value: '' }
    ]
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setCompanyData(prevState => ({
        ...prevState,
        uid: user.sub
      }));
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length > 1) {
      setCompanyData(prevState => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value
        }
      }));
    } else {
      setCompanyData({ ...companyData, [name]: value });
    }
  };

  const handleBranchChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBranches = companyData.other_branches.map((branch, i) => (
      i === index ? { ...branch, [name]: value } : branch
    ));
    setCompanyData({ ...companyData, other_branches: updatedBranches });
  };

  const addBranch = () => {
    setCompanyData(prevState => ({
      ...prevState,
      other_branches: [...prevState.other_branches, { name: '', address: '', contact: '' }]
    }));
  };

  const removeBranch = (index) => {
    const updatedBranches = companyData.other_branches.filter((_, i) => i !== index);
    setCompanyData({ ...companyData, other_branches: updatedBranches });
  };

  const handleOtherDetailsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = companyData.other_details.map((detail, i) => (
      i === index ? { ...detail, [name]: value } : detail
    ));
    setCompanyData({ ...companyData, other_details: updatedDetails });
  };

  const addOtherDetail = () => {
    setCompanyData(prevState => ({
      ...prevState,
      other_details: [...prevState.other_details, { key: '', value: '' }]
    }));
  };

  const removeOtherDetail = (index) => {
    const updatedDetails = companyData.other_details.filter((_, i) => i !== index);
    setCompanyData({ ...companyData, other_details: updatedDetails });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(companyData);
    try {
      const response = await axios.post('http://localhost:8080/company', companyData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Company data sent successfully:', response.data);
      onSuccess(response.data);
    } catch (error) {
      console.error('Error sending company data:', error);
    }
  };

  return (
    <div className="create-company">
      <h2>Create Company</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          UID:
          <input
            type="text"
            name="uid"
            value={companyData.uid}
            readOnly
          />
        </label>
        <label>
          Company Name:
          <input
            type="text"
            name="name"
            value={companyData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Legal Name:
          <input
            type="text"
            name="legal_name"
            value={companyData.legal_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Industry:
          <input
            type="text"
            name="industry"
            value={companyData.industry}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Website:
          <input
            type="text"
            name="website"
            value={companyData.website}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={companyData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Privacy Policy:
          <textarea
            name="privacy_policy"
            value={companyData.privacy_policy}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Services:
          <input
            type="text"
            name="services"
            value={companyData.services}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Terms and Conditions:
          <textarea
            name="terms_and_conditions"
            value={companyData.terms_and_conditions}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Founded Year:
          <input
            type="number"
            name="founded_year"
            value={companyData.founded_year}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Company Size:
          <select
            name="company_size"
            value={companyData.company_size}
            onChange={handleInputChange}
          >
            <option value="">Select Size</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="501-1000">501-1000</option>
            <option value="1000+">1000+</option>
          </select>
        </label>
        <label>
          Contact Email:
          <input
            type="email"
            name="contact.email"
            value={companyData.contact.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Contact Phone:
          <input
            type="text"
            name="contact.phone"
            value={companyData.contact.phone}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address Street:
          <input
            type="text"
            name="address.street"
            value={companyData.address.street}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address City:
          <input
            type="text"
            name="address.city"
            value={companyData.address.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address State:
          <input
            type="text"
            name="address.state"
            value={companyData.address.state}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address Country:
          <input
            type="text"
            name="address.country"
            value={companyData.address.country}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address Postal Code:
          <input
            type="text"
            name="address.postal_code"
            value={companyData.address.postal_code}
            onChange={handleInputChange}
          />
        </label>
        <label>
          LinkedIn:
          <input
            type="text"
            name="social_media.linkedin"
            value={companyData.social_media.linkedin}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Twitter:
          <input
            type="text"
            name="social_media.twitter"
            value={companyData.social_media.twitter}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Facebook:
          <input
            type="text"
            name="social_media.facebook"
            value={companyData.social_media.facebook}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Instagram:
          <input
            type="text"
            name="social_media.instagram"
            value={companyData.social_media.instagram}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Support Hours:
          <input
            type="text"
            name="support_hours"
            value={companyData.support_hours}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={companyData.location}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Other Branches:
          {companyData.other_branches.map((branch, index) => (
            <div key={index} className="branch">
              <input
                type="text"
                name="name"
                placeholder="Branch Name"
                value={branch.name}
                onChange={(e) => handleBranchChange(index, e)}
              />
              <input
                type="text"
                name="address"
                placeholder="Branch Address"
                value={branch.address}
                onChange={(e) => handleBranchChange(index, e)}
              />
              <input
                type="text"
                name="contact"
                placeholder="Branch Contact"
                value={branch.contact}
                onChange={(e) => handleBranchChange(index, e)}
              />
              <button type="button" onClick={() => removeBranch(index)}>Remove Branch</button>
            </div>
          ))}
          <button type="button" onClick={addBranch}>Add Branch</button>
        </label>
        <label>
          Logo URL:
          <input
            type="text"
            name="logo_url"
            value={companyData.logo_url}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Other Details:
          {companyData.other_details.map((detail, index) => (
            <div key={index} className="other-detail">
              <input
                type="text"
                name="key"
                placeholder="Key"
                value={detail.key}
                onChange={(e) => handleOtherDetailsChange(index, e)}
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={detail.value}
                onChange={(e) => handleOtherDetailsChange(index, e)}
              />
              <button type="button" onClick={() => removeOtherDetail(index)}>Remove Detail</button>
            </div>
          ))}
          <button type="button" onClick={addOtherDetail}>Add Detail</button>
        </label>
        <button type="submit">Create Company</button>
      </form>
    </div>
  );
}

export default CreateCompany;