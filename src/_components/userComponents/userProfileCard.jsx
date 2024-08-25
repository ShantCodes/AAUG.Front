import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileCard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const token = localStorage.getItem('jwtToken'); // Or wherever your token is stored

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:37523/api/AaugUser/GetCurrentUserInfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
        setProfilePictureUrl(`http://localhost:37523/api/Media/DownloadFile/${response.data.profilePictureFileId}`);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized: Invalid or expired token.');
          // Optionally, handle token refresh or redirection to login
        } else {
          console.error('Error fetching user info:', error);
        }
      }
    };

    if (token) {
      fetchUserInfo();
    } else {
      console.error('No token found. Please log in.');
      // Optionally, redirect to the login page
    }
  }, [token]);

  const handleProfilePictureChange = () => {
    // Refetch the user info to get the updated profile picture
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:37523/api/AaugUser/GetCurrentUserInfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
        setProfilePictureUrl(`http://localhost:37523/api/Media/DownloadFile/${response.data.profilePictureFileId}`);
      } catch (error) {
        console.error('Error fetching updated user info:', error);
      }
    };
    fetchUserInfo();
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="flex items-center">
        <img
          className="w-12 h-20 rounded-lg object-cover mr-4"
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
      </div>

      {/* UserPopUp Component for Profile Picture Upload */}
      <UserPopUp
        userInfo={userInfo}
        onProfilePictureChange={handleProfilePictureChange}
      />
    </div>
  );
};

const UserPopUp = ({ userInfo, onProfilePictureChange }) => {
  const [file, setFile] = useState(null);
  const uploadUrl = 'http://localhost:37523/api/AaugUser/InsertProfilePicture';

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const formData = new FormData();
      formData.append('profilePictureFile', selectedFile);

      try {
        const token = localStorage.getItem('jwtToken');
        await axios.put(uploadUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        onProfilePictureChange();
        setFile(null);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <div className="mt-4">
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