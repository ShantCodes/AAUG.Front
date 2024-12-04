import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultProfilePic from '../../assets/polyforms-pfp.webp';
import { downloadFile } from '../../services/downloadFileService/downloadFileService';
import { editUserProfile } from '../../services/userService/userSerice';
import MobileNavMenu from '../MobileNavMenu';

const EditProfileForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, jwtToken } = location.state || {};

  const [formData, setFormData] = useState({
    name: user.name || '',
    nameArmenian: user.nameArmenian || '',
    lastName: user.lastName || '',
    phone: user.phone || '',
    lastNameArmenian: user.lastNameArmenian || '',
    email: user.email || '',
    bornDate: user.bornDate || '',
    nationalCardFileId: user.nationalCardFileId || null,
    universityCardFileId: user.universityCardFileId || null,
    receiptFileId: user.receiptFileId || null,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('name', formData.name);
    form.append('phone', formData.phone);
    form.append('nameArmenian', formData.nameArmenian);
    form.append('lastName', formData.lastName);
    form.append('lastNameArmenian', formData.lastNameArmenian);
    form.append('email', formData.email);
    form.append('bornDate', formData.bornDate);
    if (formData.nationalCardFileId) form.append('nationalCardFile', formData.nationalCardFileId);
    if (formData.universityCardFileId) form.append('universityCardFile', formData.universityCardFileId);
    if (formData.receiptFileId) form.append('receiptFile', formData.receiptFileId);

    try {
      await editUserProfile(form, jwtToken);
      navigate('/profile');
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const getProfilePictureUrl = (fileId) => {
    return fileId ? downloadFile(fileId) : defaultProfilePic;
  };

  if (!user) {
    return <p className="text-center text-gray-600">No user data available.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white text-black min-h-screen mt-16">
      {/* Mobile Navigation Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <MobileNavMenu />
      </div>
  
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        {/* Profile Picture */}
        <div className="text-center mb-6">
          <img
            src={getProfilePictureUrl(user.profilePictureFileId)}
            alt={`${formData.name} ${formData.lastName}`}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-gray-700 mx-auto mb-4"
          />
        </div>
  
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="text-lg">First Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1"
            placeholder="First Name"
            required
          />
          <label className="text-lg">First Name Armenian</label>
          <input
            type="text"
            name="nameArmenian"
            value={formData.nameArmenian}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1"
            placeholder="First Name Armenian"
            required
          />
          <label className="text-lg">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1"
            placeholder="Last Name"
            required
          />
          <label className="text-lg">Last Name Armenian</label>
          <input
            type="text"
            name="lastNameArmenian"
            value={formData.lastNameArmenian}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1"
            placeholder="Last Name Armenian"
            required
          />
          <label className="text-lg">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1"
            placeholder="Phone"
            required
          />
          <label className="text-lg">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1"
            placeholder="Email"
            required
          />
          <label className="text-lg">Born Date</label>
          <input
            type="date"
            name="bornDate"
            value={formData.bornDate}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1"
            placeholder="Born Date"
            required
          />
        </div>
  
        {/* File Inputs */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <label className="w-full md:w-1/4 text-lg">National Card</label>
            <input type="file" name="nationalCardFileId" onChange={handleFileChange} className="w-full" />
            {user.nationalCardFileId && (
              <img
                src={downloadFile(user.nationalCardFileId)}
                alt="National Card"
                className="w-20 h-20 md:w-24 md:h-24 object-cover border border-gray-300"
              />
            )}
          </div>
  
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <label className="w-full md:w-1/4 text-lg">University Card</label>
            <input type="file" name="universityCardFileId" onChange={handleFileChange} className="w-full" />
            {user.universityCardFileId && (
              <img
                src={downloadFile(user.universityCardFileId)}
                alt="University Card"
                className="w-20 h-20 md:w-24 md:h-24 object-cover border border-gray-300"
              />
            )}
          </div>
        </div>
  
        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full md:w-auto"
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
      </form>
    </div>
  );
  
};

export default EditProfileForm;
