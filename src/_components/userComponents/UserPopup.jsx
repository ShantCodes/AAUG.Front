import React, { useState } from 'react';
import { FaCrown, FaStar } from 'react-icons/fa';
import DefaultPicture from '../../assets/polyforms-pfp.webp';
import { downloadFile } from '../../services/downloadFileService/downloadFileService';
import { uploadProfilePicture } from '../../services/userService/userSerice';
import axios from 'axios';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import { sendNotification } from '../../services/notificationService/notificationService';

const UserPopUp = ({ userInfo, onProfilePictureChange }) => {
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({
    title: '',
    body: '',
    icon: 'https://aaug.ir/icons/aaugLogo.png', // Default icon
    url: 'https://aaug.ir', // Prefilled URL
  });

  const profilePictureUrl = userInfo?.profilePictureFileId
    ? downloadFile(userInfo.profilePictureFileId)
    : DefaultPicture;

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

  const handleSendNotification = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert('You must be logged in to send notifications.');
      return;
    }

    try {
      await sendNotification(notification);
      alert('Notification sent successfully!');
      setShowModal(false);
    } catch (error) {
      alert('Failed to send notification.');
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
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => {
            localStorage.removeItem('jwtToken');
            window.location.href = '/login';
          }}
          className="bg-red-500 text-white py-2 px-4 rounded text-xs"
        >
          Logout
        </button>
        {(userInfo?.role === 'King' ||
          userInfo?.role === 'Varich' ||
          userInfo?.role === 'Hanxnakhumb') && (
            <button
              onClick={() => setShowModal(true)}
              className="text-yellow-600 hover:text-yellow-800"
            >
              <BellAlertIcon className="w-6 h-6" />
            </button>
          )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Create Notification</h3>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={notification.title}
                onChange={(e) =>
                  setNotification({ ...notification, title: e.target.value })
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Body</label>
              <textarea
                value={notification.body}
                onChange={(e) =>
                  setNotification({ ...notification, body: e.target.value })
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">URL</label>
              <input
                type="text"
                value={notification.url}
                readOnly
                className="w-full border rounded px-2 py-1 bg-gray-100"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNotification}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPopUp;
