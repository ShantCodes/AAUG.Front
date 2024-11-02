import React, { useState, useEffect } from 'react';
import { getUserProfile, uploadProfilePicture } from '../../services/userService/userSerice';
import { downloadFile } from '../../services/downloadFileService/downloadFileService';

const UserProfileCard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserProfile();
        setUserInfo(data);
        setProfilePictureUrl(downloadFile(data.profilePictureFileId));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized: Invalid or expired token.');
        } else {
          console.error('Error fetching user info:', error);
        }
      }
    };

    if (token) {
      fetchUserInfo();
    } else {
      console.error('No token found. Please log in.');
    }
  }, [token]);

  const handleProfilePictureChange = async () => {
    try {
      const data = await getUserProfile();
      setUserInfo(data);
      setProfilePictureUrl(downloadFile(data.profilePictureFileId));
    } catch (error) {
      console.error('Error fetching updated user info:', error);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="flex items-center relative">
        <img
          className="w-12 h-20 rounded-lg object-cover mr-4 relative"
          src={profilePictureUrl}
          alt="User Profile"
        />
        <div>
          <div className="font-bold text-xl mb-2">{userInfo.name} {userInfo.lastName}</div>
          <p className="text-gray-700 text-base">
            Armenian Name: {userInfo.nameArmenian} {userInfo.lastNameArmenian}
          </p>
          <p className="text-gray-700 text-base">
            User ID: {userInfo.userId}
          </p>
          <p className={`text-sm ${userInfo.isApproved ? 'text-green-600' : 'text-red-600'}`}>
            {userInfo.isApproved ? 'Approved' : 'Not Approved'}
          </p>
        </div>

        {/* UserPopUp Component for Profile Picture Upload */}
        <UserPopUp
          userInfo={userInfo}
          onProfilePictureChange={handleProfilePictureChange}
        />
      </div>
    </div>
  );
};

const UserPopUp = ({ userInfo, onProfilePictureChange }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      try {
        const token = localStorage.getItem('jwtToken');
        await uploadProfilePicture(selectedFile, token);
        onProfilePictureChange();
        setFile(null);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <div className="absolute left-0 transform -translate-x-full mt-4 p-4 bg-white border border-gray-300 rounded shadow-lg hover:block hidden group-hover:block">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="profile-picture-upload"
      />
      <label
        htmlFor="profile-picture-upload"
        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Change Profile Picture
      </label>
    </div>
  );
};

export default UserProfileCard;
