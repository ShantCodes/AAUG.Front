import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserData } from '../../services/userService/userSerice';
import { downloadFile } from '../../services/downloadFileService/downloadFileService';
import defaultProfilePic from '../../assets/polyforms-pfp.webp';

const ExpandProfileForAdmins = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { aaugUserId } = location.state || {};

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null); // State to control full-screen image

  useEffect(() => {
    const fetchUser = async () => {
      if (!aaugUserId) {
        navigate('/'); // Redirect if aaugUserId is missing
        return;
      }

      try {
        const userData = await getUserData(aaugUserId);
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [aaugUserId, navigate]);

  const getProfilePictureUrl = (fileId) => {
    return fileId ? downloadFile(fileId) : defaultProfilePic;
  };

  const openImageFullScreen = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  const closeFullScreenImage = () => {
    setFullScreenImage(null);
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

        {/* Armenian Names */}
        <div className="text-center max-w-2xl text-lg text-gray-950 mb-4">
          <div className="flex justify-start">
            <p className="font-semibold w-40 text-right mr-4">Email:</p>
            <p>{user.email}</p>
          </div>
          <div className="flex justify-start">
            <p className="font-semibold w-40 text-right mr-4">Last Name (Armenian):</p>
            <p>{user.lastNameArmenian}</p>
          </div>
          <div className="flex justify-start">
            <p className="font-semibold w-40 text-right mr-4">First Name (Armenian):</p>
            <p>{user.nameArmenian}</p>
          </div>
          <div className="flex justify-start">
            <p className="font-semibold w-40 text-right mr-4">Membership Code:</p>
            <p>{user.membershipCode}</p>
          </div>
          <div className="flex justify-start">
            <p className="font-semibold w-40 text-right mr-4">Phone:</p>
            <p>{user.phone}</p>
          </div>
          <div className="flex justify-start">
            <p className="font-semibold w-40 text-right mr-4">Subscription Date:</p>
            <p>{user.subscribeDate}</p>
          </div>
        </div>


      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* National Card */}
        <div>
          <p className="text-lg font-semibold mb-2">National Card:</p>
          {user.nationalCardFileId ? (
            <img
              src={downloadFile(user.nationalCardFileId)}
              alt="National Card"
              className="w-full h-auto border border-gray-500 rounded cursor-pointer"
              onClick={() => openImageFullScreen(downloadFile(user.nationalCardFileId))}
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
              src={downloadFile(user.universityCardFileId)}
              alt="University Card"
              className="w-full h-auto border border-gray-500 rounded cursor-pointer"
              onClick={() => openImageFullScreen(downloadFile(user.universityCardFileId))}
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
              src={downloadFile(user.receiptFileId)}
              alt="Receipt"
              className="w-full h-auto border border-gray-500 rounded cursor-pointer"
              onClick={() => openImageFullScreen(downloadFile(user.receiptFileId))}
            />
          ) : (
            <p className="text-gray-500">N/A</p>
          )}
        </div>
      </div>

      {/* Full-screen image preview */}
      {fullScreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeFullScreenImage}
        >
          <img
            src={fullScreenImage}
            alt="Full Screen Preview"
            className="max-w-full max-h-full"
          />
        </div>
      )}

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
