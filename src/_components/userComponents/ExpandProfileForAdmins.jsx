import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultProfilePic from '../../assets/polyforms-pfp.webp'; // Import default profile picture if needed

const ExpandProfileForAdmins = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { aaugUserId, jwtToken } = location.state || {};

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!aaugUserId || !jwtToken) {
        navigate('/'); // Redirect if userId or jwtToken is missing
        return;
      }

      try {
        const response = await axios.get(`http://localhost:37523/api/AaugUser/GetAaugUserFullByAaugUserId/${aaugUserId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [aaugUserId, jwtToken, navigate]);

  const getProfilePictureUrl = (fileId) => {
    return fileId
      ? `http://localhost:37523/api/Media/DownloadFile/${fileId}`
      : defaultProfilePic; // Use default if no fileId
  };

  const getFileUrl = (fileId) => {
    return fileId
      ? `http://localhost:37523/api/Media/DownloadFile/${fileId}`
      : ''; // Return empty string if no fileId
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading user profile...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!user) {
    return <p className="text-center text-gray-600">No user data found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <div className="flex items-center gap-4">
        <img
          src={getProfilePictureUrl(user.profilePictureFileId)}
          alt={`${user.name} ${user.lastName}`}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">{`${user.name} ${user.lastName}`}</h2>
          <p className="text-lg text-gray-700">User ID: {user.id}</p>
          <p className="text-lg text-gray-700">Email: {user.email || 'N/A'}</p>
          <p className="text-lg text-gray-700">Roles: {(user.role && Array.isArray(user.role) ? user.role.join(', ') : 'N/A') || 'N/A'}</p>
          <p className="text-lg text-gray-700">Created At: {new Date(user.subscribeDate).toLocaleDateString() || 'N/A'}</p>
          <p className="text-lg text-gray-700">Approved: {user.isApproved ? 'Yes' : 'No'}</p>
          <p className="text-lg text-gray-700">National Card: 
            {user.nationalCardFileId ? (
              <img
                src={getFileUrl(user.nationalCardFileId)}
                alt="National Card"
                className="w-64 h-auto mt-2 border border-gray-300 rounded"
              />
            ) : 'N/A'}
          </p>
          <p className="text-lg text-gray-700">University Card: 
            {user.universityCardFileId ? (
              <img
                src={getFileUrl(user.universityCardFileId)}
                alt="University Card"
                className="w-64 h-auto mt-2 border border-gray-300 rounded"
              />
            ) : 'N/A'}
          </p>
          <p className="text-lg text-gray-700">Receipt: 
            {user.receiptFileId ? (
              <img
                src={getFileUrl(user.receiptFileId)}
                alt="Receipt"
                className="w-64 h-auto mt-2 border border-gray-300 rounded"
              />
            ) : 'N/A'}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Users List
        </button>
      </div>
    </div>
  );
};

export default ExpandProfileForAdmins;
