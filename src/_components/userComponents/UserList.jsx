import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteButton from './DeleteUserButton';
import ApproveButton from './ApproveUserButton';
import AssignRolesModal from './AssignRolesModal';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [expandedUserId, setExpandedUserId] = useState(null); // State for expanded user
  const jwtToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        const [usersResponse, rolesResponse] = await Promise.all([
          axios.get('http://localhost:37523/api/AaugUser/GetAllUsers', {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }),
          axios.get('http://localhost:37523/api/AaugUser/GetAllRoles', {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }),
        ]);

        setUsers(usersResponse.data);
        setRoles(rolesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndRoles();
  }, [jwtToken]);

  const handleUserDeleted = (aaugUserId) => {
    setUsers(users.filter(user => user.id !== aaugUserId));
  };

  const handleUserApproved = (aaugUserId, isApproved) => {
    setUsers(users.map(user => user.id === aaugUserId ? { ...user, isApproved } : user));
  };

  const getProfilePictureUrl = (fileId) => {
    return fileId
      ? `http://localhost:37523/api/Media/DownloadFile/${fileId}`
      : 'https://via.placeholder.com/100';
  };

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

  if (loading) {
    return <p className="text-center text-gray-600">Loading users...</p>;
  }

  return (
    <div className="max-w-xl p-4 mt-4">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            onMouseEnter={() => handleExpand(user.userId)}
            onMouseLeave={handleCollapse}
            className={`relative flex items-center bg-white rounded-lg shadow p-4 transition-all duration-500 ease-in-out ${
              expandedUserId === user.userId ? 'h-44' : 'h-28'
            } overflow-hidden hover:bg-gray-200`}
          >
            <img
              src={getProfilePictureUrl(user.profilePictureFileId)}
              alt={`${user.name} ${user.lastName}`}
              className="w-24 h-24 rounded-full object-cover mr-4"
            />
            <div className="text-left flex-grow">
              <h2 className="text-black text-lg font-semibold">{`${user.name} ${user.lastName}`}</h2>
              <p className="text-gray-900">{`${user.nameArmenian} ${user.lastNameArmenian}`}</p>
              <p className="text-gray-900">User ID: {user.userId}</p>
              <p className="text-gray-900">Email: {user.email || 'N/A'}</p>
            </div>
            <div className={`absolute right-4 top-4 flex flex-col gap-2 transition-opacity duration-500 ease-in-out ${
              expandedUserId === user.userId ? 'opacity-100' : 'opacity-0'
            }`}>
              <ApproveButton aaugUserId={user.id} jwtToken={jwtToken} onUserApproved={handleUserApproved} className="text-sm px-3 py-1" />
              <DeleteButton aaugUserId={user.id} jwtToken={jwtToken} onUserDeleted={handleUserDeleted} className="text-sm px-3 py-1" />
              <button
                onClick={() => handleAssignRolesClick(user.userId)} // Pass userId here
                className="bg-purple-500 text-white text-sm px-3 py-1 rounded-md shadow-md hover:bg-purple-600 transition-colors"
              >
                Assign Roles
              </button>
            </div>
          </div>
        ))}
      </div>

      {showRolesModal && (
        <AssignRolesModal
          userId={selectedUserId} // Pass the selected userId
          roles={roles}
          onClose={() => setShowRolesModal(false)}
          jwtToken={jwtToken}
        />
      )}
    </div>
  );
};

export default UsersList;
