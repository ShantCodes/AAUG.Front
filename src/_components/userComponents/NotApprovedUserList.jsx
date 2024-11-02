import React, { useEffect, useState } from 'react';
import DeleteButton from './DeleteUserButton';
import ApproveButton from './ApproveUserButton';
import { getUserProfile, getNotApprovedUsers } from '../../services/userService/userSerice';
import { downloadFile } from '../../services/downloadFileService/downloadFileService';
import defaultProfilePic from '../../assets/polyforms-pfp.webp';

const NotApprovedUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await getUserProfile();
        setCurrentUser(userInfo);

        const usersData = await getNotApprovedUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users or current user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    Default: 5,
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
      <h1 className="text-2xl font-bold mb-6">New signed up</h1>
      <div className="flex flex-col gap-4">
        {sortedUsers.map((user) => (
          <div
            key={user.id}
            onMouseEnter={() => handleExpand(user.userId)}
            onMouseLeave={handleCollapse}
            className={`relative flex items-center rounded-lg shadow p-4 transition-all duration-500 ease-in-out ${expandedUserId === user.userId ? 'h-44' : 'h-28'
              } overflow-hidden hover:bg-gray-200 ${getBackgroundColor(user.role)}`}
          >
            <img
              src={getProfilePictureUrl(user.profilePictureFileId)}
              alt={`${user.name} ${user.lastName}`}
              className="w-24 h-24 rounded-full object-cover mr-4"
            />
            <div className="text-left flex-grow">
              <h2 className="text-black text-lg font-semibold">{`${user.name} ${user.lastName}`}</h2>
              <p className="text-gray-900">{`${user.nameArmenian} ${user.lastNameArmenian}`}</p>
              <p className="text-gray-900">Email: {user.email || 'N/A'}</p>
            </div>
            {currentUser?.role?.toLowerCase() !== 'hanxnakhumb' && (
              <div
                className={`absolute right-4 top-4 flex flex-col gap-2 transition-opacity duration-500 ease-in-out ${expandedUserId === user.userId ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                <ApproveButton aaugUserId={user.id} onUserApproved={handleUserApproved} className="text-sm px-3 py-1" />
                <DeleteButton aaugUserId={user.id} onUserDeleted={handleUserDeleted} className="text-sm px-3 py-1" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotApprovedUserList;
