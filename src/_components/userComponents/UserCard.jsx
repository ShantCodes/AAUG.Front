import React from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import ApproveButton from './ApproveUserButton';
import DeleteButton from './DeleteUserButton'; // Import the DeleteButton
import { downloadFile } from '../../services/downloadFileService/downloadFileService';
import defaultProfilePic from '../../assets/polyforms-pfp.webp';

const UserCard = ({ user, onUserApproved, onUserDeleted, onAssignRolesClick, currentUserRole }) => {
  const getProfilePictureUrl = (fileId) => {
    return fileId ? downloadFile(fileId) : defaultProfilePic;
  };

  const getBackgroundColor = (roles) => {
    if (roles.includes('Varich')) return 'bg-purple-200';
    if (roles.includes('King')) return 'bg-yellow-200';
    if (roles.includes('Hanxnakhumb')) return 'bg-sky-300';
    if (roles.includes('Antam')) return 'bg-green-200';
    return 'bg-white';
  };

  return (
    <div className={`relative flex items-center rounded-lg shadow p-4 transition-all duration-500 ease-in-out h-28 overflow-hidden hover:bg-gray-200 ${getBackgroundColor(user.role)} cursor-pointer`}>
      <img
        src={getProfilePictureUrl(user.profilePictureFileId)}
        alt={`${user.name} ${user.lastName}`}
        className="w-24 h-24 rounded-full object-cover mr-4"
      />

      <div className="text-left flex-grow">
        <h2 className="text-black text-lg font-semibold flex items-center">
          {`${user.name} ${user.lastName}`}
          {user.role.includes('Antam') && (
            <CheckBadgeIcon className="ml-2 h-8 w-8 text-white fill-blue-500" />
          )}
        </h2>
        <p className="text-gray-900">{`${user.nameArmenian} ${user.lastNameArmenian}`}</p>
        <p className="text-gray-900">User ID: {user.userId}</p>
        <p className="text-gray-900">Email: {user.email || 'N/A'}</p>
      </div>

      {currentUserRole?.toLowerCase() !== 'hanxnakhumb' && (
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <ApproveButton
            aaugUserId={user.id}
            onUserApproved={onUserApproved}
            className="text-sm px-3 py-1"
          />
          {onUserDeleted && (
            <DeleteButton
              aaugUserId={user.id}
              onUserDeleted={onUserDeleted}
              className="text-sm px-3 py-1"
            />
          )}
          {onAssignRolesClick && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAssignRolesClick(user.userId);
              }}
              className="bg-purple-500 text-white text-sm px-3 py-1 rounded-md shadow-md hover:bg-purple-600 transition-colors"
            >
              Assign Roles
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
