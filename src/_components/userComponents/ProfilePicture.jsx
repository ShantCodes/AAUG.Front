import React, { useState, useEffect } from 'react';
import UserPopUp from './UserPopUp';

const ProfilePicture = ({ userInfo }) => {
  const [profilePictureFileId, setProfilePictureFileId] = useState(userInfo.profilePictureFileId);

  useEffect(() => {
    setProfilePictureFileId(userInfo.profilePictureFileId);
  }, [userInfo.profilePictureFileId]);

  const handleProfilePictureChange = () => {
    // Optionally, fetch updated user info from API to get the new profile picture ID
    setProfilePictureFileId(userInfo.profilePictureFileId);
  };

  const profilePictureUrl = profilePictureFileId
    ? `http://localhost:37523/api/Media/DownloadFile/${profilePictureFileId}`
    : '/default-profile.png'; // Fallback URL

  return (
    <div className="relative group">
      <img
        src={profilePictureUrl}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
      />
      <UserPopUp userInfo={userInfo} onProfilePictureChange={handleProfilePictureChange} />
    </div>
  );
};

export default ProfilePicture;
