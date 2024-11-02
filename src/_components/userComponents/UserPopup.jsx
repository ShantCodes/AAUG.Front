import React, { useState } from 'react';
import { FaCrown, FaStar } from 'react-icons/fa';
import DefaultPicture from '../../assets/polyforms-pfp.webp'; // Import the default picture
import { downloadFile } from '../../services/downloadFileService/downloadFileService';
import { uploadProfilePicture } from '../../services/userService/userSerice'; // Import the new service

const UserPopUp = ({ userInfo, onProfilePictureChange }) => {
  const [file, setFile] = useState(null);
  const profilePictureUrl = userInfo?.profilePictureFileId
    ? downloadFile(userInfo.profilePictureFileId)
    : DefaultPicture;

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      try {
        const token = localStorage.getItem('jwtToken');
        await uploadProfilePicture(selectedFile, token); // Call the service method
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
      style={{ whiteSpace: 'nowrap' }}
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
          <p className="text-sm font-semibold">
            {userInfo ? `${userInfo.name} ${userInfo.lastName}` : 'Guest User'}
          </p>
          <p className="text-xs text-gray-600">
            {userInfo
              ? `${userInfo.nameArmenian} ${userInfo.lastNameArmenian}`
              : 'Անհայտ Օգտագործող'}
          </p>
          <p className="text-2xl text-yellow-600 font-bold">
            {userInfo?.role && (
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
