import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultProfilePic from '../../assets/polyforms-pfp.webp';

const EditProfileForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, jwtToken } = location.state || {};

  const [formData, setFormData] = useState({
    name: user.name || '',
    lastName: user.lastName || '',
    email: user.email || '',
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
    form.append('lastName', formData.lastName);
    form.append('email', formData.email);
    if (formData.nationalCardFileId) form.append('nationalCardFile', formData.nationalCardFileId);
    if (formData.universityCardFileId) form.append('universityCardFile', formData.universityCardFileId);
    if (formData.receiptFileId) form.append('receiptFile', formData.receiptFileId);

    try {
      await axios.put(
        `http://localhost:37523/api/AaugUser/EditAaugUserFull`,
        form,
        { headers: { Authorization: `Bearer ${jwtToken}`, 'Content-Type': 'multipart/form-data' } }
      );
      navigate('/profile');
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const getProfilePictureUrl = (fileId) => {
    return fileId ? `http://localhost:37523/api/Media/DownloadFile/${fileId}` : defaultProfilePic;
  };

  if (!user) {
    return <p className="text-center text-gray-600">No user data available.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white text-black min-h-screen mt-16">
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        {/* Profile Picture */}
        <div className="text-center mb-6">
          <img
            src={getProfilePictureUrl(user.profilePictureFileId)}
            alt={`${formData.name} ${formData.lastName}`}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 mb-4"
          />
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
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
        </div>

        {/* File Inputs (Horizontal Layout) */}
        {/* File Inputs with Image Preview */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label className="w-1/4 text-lg">National Card</label>
            <input type="file" name="nationalCardFileId" onChange={handleFileChange} />
            {user.nationalCardFileId && (
              <img
                src={`http://localhost:37523/api/Media/DownloadFile/${user.nationalCardFileId}`}
                alt="National Card"
                className="w-24 h-24 object-cover border border-gray-300"
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/4 text-lg">University Card</label>
            <input type="file" name="universityCardFileId" onChange={handleFileChange} />
            {user.universityCardFileId && (
              <img
                src={`http://localhost:37523/api/Media/DownloadFile/${user.universityCardFileId}`}
                alt="University Card"
                className="w-24 h-24 object-cover border border-gray-300"
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/4 text-lg">Receipt</label>
            <input type="file" name="receiptFileId" onChange={handleFileChange} />
            {user.receiptFileId && (
              <img
                src={`http://localhost:37523/api/Media/DownloadFile/${user.receiptFileId}`}
                alt="Receipt"
                className="w-24 h-24 object-cover border border-gray-300"
              />
            )}
          </div>
        </div>


        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
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
