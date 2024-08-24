import React, { useState } from 'react';
import UserPopUp from './UserPopUp';

const ProfilePicture = ({ userInfo }) => {
  const [profilePictureFileId, setProfilePictureFileId] = useState(userInfo.profilePictureFileId);

  const handleProfilePictureChange = () => {
    // Optionally, fetch updated user info from API to get the new profile picture ID
    // For simplicity, we assume the API is updated and we just update the state
    setProfilePictureFileId(userInfo.profilePictureFileId);
  };

  const profilePictureUrl = `http://localhost:37523/api/Media/DownloadFile/${profilePictureFileId}`;

  return (
    <div className="relative group">
      <img
        src={profilePictureUrl}
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
      />
      <UserPopUp userInfo={userInfo} onProfilePictureChange={handleProfilePictureChange} />
    </div>
  );
};

export default ProfilePicture;
