import React, { useState, useEffect, useRef } from 'react';
import UserPopUp from './UserPopUp';
import DefaultPicture from '../../assets/polyforms-pfp.webp'; // Import the default picture
import { downloadFile } from '../../services/downloadFileService/downloadFileService'

const ProfilePicture = ({ userInfo }) => {
  const [profilePictureFileId, setProfilePictureFileId] = useState(userInfo?.profilePictureFileId || null);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setProfilePictureFileId(userInfo?.profilePictureFileId || null);
  }, [userInfo?.profilePictureFileId]);

  const handleProfilePictureChange = () => {
    setProfilePictureFileId(userInfo?.profilePictureFileId || null);
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
    }, 1000); // 1 second delay
  };

  const profilePictureUrl = profilePictureFileId
    ? downloadFile(profilePictureFileId)
    : DefaultPicture;

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
        <div className="absolute right-0 top-full mt-2 transition-opacity duration-300 opacity-100">
          <UserPopUp userInfo={userInfo} onProfilePictureChange={handleProfilePictureChange} />
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
