import React from 'react';
import UserPopUp from './UserPopUp';

const ProfilePicture = ({ profilePictureFileId, userInfo }) => {
  const profilePictureUrl = `http://localhost:37523/api/Media/DownloadFile/${profilePictureFileId}`;

  return (
    <div className="relative group">
      <img
        src={profilePictureUrl}
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
      />
      <UserPopUp userInfo={userInfo} />
    </div>
  );
};

export default ProfilePicture;
