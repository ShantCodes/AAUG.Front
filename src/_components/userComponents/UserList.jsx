import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteButton from './DeleteUserButton';
import ApproveButton from './ApproveUserButton';
import AssignRolesModal from './AssignRolesModal';
import { getApprovedUsers, getAllRoles, getUserProfile } from '../../services/userService/userSerice';
import defaultProfilePic from '../../assets/polyforms-pfp.webp';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { downloadFile } from '../../services/downloadFileService/downloadFileService';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        // Fetch current user info
        const userInfo = await getUserProfile();
        setCurrentUser(userInfo);

        // Fetch users
        const usersData = await getApprovedUsers();
        setUsers(usersData);

        // Fetch roles
        const rolesData = await getAllRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error('Error fetching users or roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndRoles();
  }, []);

  const handleUserDeleted = (aaugUserId) => {
    setUsers(users.filter(user => user.id !== aaugUserId));
  };

  const handleUserApproved = (aaugUserId, isApproved) => {
    setUsers(users.map(user => user.id === aaugUserId ? { ...user, isApproved } : user));
  };

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

  const rolePriority = {
    King: 1,
    Varich: 2,
    Hanxnakhumb: 3,
    Antam: 4,
    Default: 5
  };

  const getUserRolePriority = (roles) => {
    for (const role of roles) {
      if (rolePriority[role] !== undefined) {
        return rolePriority[role];
      }
    }
    return rolePriority.Default;
  };

  const sortedUsers = [...users].sort((a, b) => getUserRolePriority(a.role) - getUserRolePriority(b.role));

  const handleAssignRolesClick = (userId) => {
    setSelectedUserId(userId);
    setShowRolesModal(true);
  };

  const handleExpand = (userId) => {
    setExpandedUserId(userId);
  };

  const handleCollapse = () => {
    setExpandedUserId(null);
  };

  const handleUserClick = (aaugUserId) => {
    navigate('/ExpandProfile', { state: { aaugUserId } });
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading users...</p>;
  }

  return (
    <div className="max-w-xl p-4 mt-4">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>
      <div className="flex flex-col gap-4">
        {sortedUsers.map((user) => (
          <div
            key={user.id}
            onMouseEnter={() => handleExpand(user.userId)}
            onMouseLeave={handleCollapse}
            onClick={() => handleUserClick(user.id)}
            className={`relative flex items-center rounded-lg shadow p-4 transition-all duration-500 ease-in-out ${expandedUserId === user.userId ? 'h-44' : 'h-28'
              } overflow-hidden hover:bg-gray-200 ${getBackgroundColor(user.role)} cursor-pointer`}
          >
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

            {currentUser?.role?.toLowerCase() !== 'hanxnakhumb' && (
              <div className={`absolute right-4 top-4 flex flex-col gap-2 transition-opacity duration-500 ease-in-out ${expandedUserId === user.userId ? 'opacity-100' : 'opacity-0'
                }`}>
                <ApproveButton
                  aaugUserId={user.id}
                  onUserApproved={handleUserApproved}
                  className="text-sm px-3 py-1"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAssignRolesClick(user.userId);
                  }}
                  className="bg-purple-500 text-white text-sm px-3 py-1 rounded-md shadow-md hover:bg-purple-600 transition-colors"
                >
                  Assign Roles
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showRolesModal && (
        <AssignRolesModal
          userId={selectedUserId}
          roles={roles}
          onClose={() => setShowRolesModal(false)}
          currentUserRoles={users.find(user => user.userId === selectedUserId)?.role || []}
        />
      )}
    </div>
  );
};

export default UsersList;
