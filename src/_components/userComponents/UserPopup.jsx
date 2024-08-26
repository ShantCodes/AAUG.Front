import React, { useState } from 'react';
import axios from 'axios';
import { FaCrown, FaStar } from 'react-icons/fa';

const UserPopUp = ({ userInfo, onProfilePictureChange }) => {
  const [file, setFile] = useState(null);
  const profilePictureUrl = `http://localhost:37523/api/Media/DownloadFile/${userInfo.profilePictureFileId}`;
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
    <div
      className="bg-white rounded shadow-lg p-4 w-64 max-w-xs"
      style={{
        whiteSpace: 'nowrap',
      }}
    >
      <div className="flex items-center mb-2">
        <div className="relative">
          <img
            src={profilePictureUrl}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300">
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="text-white text-2xl">+</span>
          </label>
        </div>
        <div className="ml-4">
          <p className="text-sm font-semibold">{`${userInfo.name} ${userInfo.lastName}`}</p>
          <p className="text-xs text-gray-600">{`${userInfo.nameArmenian} ${userInfo.lastNameArmenian}`}</p>
          <p className="text-2xl text-yellow-600 font-bold">
            {userInfo.role && (
              <>
                {userInfo.role}
                {userInfo.role === 'King' && (
                  <FaCrown className="inline ml-2 text-yellow-600 size-10" />
                )}
                {userInfo.role === 'Varich' && (
                  <FaStar className="inline ml-2 text-yellow-600 size-10" />
                )}
              </>
            )}
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem('jwtToken');
          window.location.href = '/login';
        }}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded text-xs"
      >
        Logout
      </button>
    </div>
  );
};

export default UserPopUp;
