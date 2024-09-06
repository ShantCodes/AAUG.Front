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
    <div className="max-w-5xl mx-auto p-4 bg-white text-black min-h-screen mt-16">
      <div className="flex flex-col items-center mb-6">
        {/* Profile Picture */}
        <img
          src={getProfilePictureUrl(user.profilePictureFileId)}
          alt={`${user.name} ${user.lastName}`}
          className="w-40 h-40 rounded-full object-cover border-4 border-gray-700 mb-4"
        />
        <h1 className="text-4xl font-bold mb-2">{`${user.name} ${user.lastName}`}</h1>
        <p className="text-lg text-gray-900 mb-4">User ID: {user.id}</p>

        {/* Short Bio */}
        <p className="text-center max-w-2xl text-lg text-gray-950 mb-4">
          Backend developer at EIED <br />
          Member of Iran sport climbing national team <br />
          Athlete - Software engineer
        </p>

        {/* Stats */}
        <div className="flex gap-6 justify-center mb-6">
          <div className="text-center">
            <span className="font-bold text-xl">71</span>
            <p className="text-gray-400">Posts</p>
          </div>
          <div className="text-center">
            <span className="font-bold text-xl">1,219</span>
            <p className="text-gray-400">Followers</p>
          </div>
          <div className="text-center">
            <span className="font-bold text-xl">656</span>
            <p className="text-gray-400">Following</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Edit Profile
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            View Archive
          </button>
        </div>
      </div>
      {/* User Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* National Card */}
        <div>
          <p className="text-lg font-semibold mb-2">National Card:</p>
          {user.nationalCardFileId ? (
            <img
              src={getFileUrl(user.nationalCardFileId)}
              alt="National Card"
              className="w-full h-auto border border-gray-500 rounded"
            />
          ) : (
            <p className="text-gray-500">N/A</p>
          )}
        </div>

        {/* University Card */}
        <div>
          <p className="text-lg font-semibold mb-2">University Card:</p>
          {user.universityCardFileId ? (
            <img
              src={getFileUrl(user.universityCardFileId)}
              alt="University Card"
              className="w-full h-auto border border-gray-500 rounded"
            />
          ) : (
            <p className="text-gray-500">N/A</p>
          )}
        </div>

        {/* Receipt */}
        <div>
          <p className="text-lg font-semibold mb-2">Receipt:</p>
          {user.receiptFileId ? (
            <img
              src={getFileUrl(user.receiptFileId)}
              alt="Receipt"
              className="w-full h-auto border border-gray-500 rounded"
            />
          ) : (
            <p className="text-gray-500">N/A</p>
          )}
        </div>
      </div>


      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Users List
        </button>
      </div>
    </div>
  );
};

export default ExpandProfileForAdmins;
