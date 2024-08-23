import React from 'react';

const UserPopUp = ({ userInfo, onHover }) => {
  const profilePictureUrl = `http://localhost:37523/api/Media/DownloadFile/${userInfo.profilePictureFileId}`;

  return (
    <div
      className="absolute left-0 mt-2 p-4 bg-white rounded shadow-lg w-64 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        transform: 'translateX(-100%)',
        whiteSpace: 'nowrap',
        right: '100%',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      <div className="flex items-center mb-2">
        <img
          src={profilePictureUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <p className="text-sm font-semibold">{`${userInfo.name} ${userInfo.lastName}`}</p>
          <p className="text-xs text-gray-600">{`${userInfo.nameArmenian} ${userInfo.lastNameArmenian}`}</p>
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
