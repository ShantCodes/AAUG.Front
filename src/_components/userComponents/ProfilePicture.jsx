import React, { useState, useEffect, useRef } from 'react';
import UserPopUp from './UserPopUp';

const ProfilePicture = ({ userInfo }) => {
  const [profilePictureFileId, setProfilePictureFileId] = useState(userInfo.profilePictureFileId);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setProfilePictureFileId(userInfo.profilePictureFileId);
  }, [userInfo.profilePictureFileId]);

  const handleProfilePictureChange = () => {
    setProfilePictureFileId(userInfo.profilePictureFileId);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 1000); // 2 seconds delay
  };

  const profilePictureUrl = profilePictureFileId
    ? `http://localhost:37523/api/Media/DownloadFile/${profilePictureFileId}`
    : '/default-profile.png';

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={profilePictureUrl}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
      />
      {isHovered && (
        <div className="absolute left-0 top-full mt-2 transition-opacity duration-300 opacity-100">
          <UserPopUp userInfo={userInfo} onProfilePictureChange={handleProfilePictureChange} />
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
