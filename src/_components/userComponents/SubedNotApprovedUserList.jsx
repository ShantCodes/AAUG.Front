import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteButton from './DeleteUserButton';
import ApproveButton from './ApproveUserButton';
import AssignRolesModal from './AssignRolesModal';
import defaultProfilePic from '../../assets/polyforms-pfp.webp';
import ApproveSubButton from './ApproveSubButton';
import { getOtherUserProfile, getSubscribedNotSubApprovedUsers } from '../../services/userService/userSerice';
import { downloadFile } from '../../services/downloadFileService/downloadFileService';

const SubbedNotApprovedUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        // const userInfo = await getOtherUserProfile();
        // setCurrentUser(userInfo);

        // Fetch initial users
        const usersData = await getSubscribedNotSubApprovedUsers(pageNumber);
        setUsers(usersData);
        setHasMoreUsers(usersData.length > 0);

        // Fetch roles
        const rolesData = await getAllRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error('Error fetching users or current user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndRoles();
  }, [pageNumber]);

  const loadMoreUsers = async () => {
    if (!hasMoreUsers || loading) return;

    setLoading(true);
    try {
      const nextPageNumber = pageNumber + 1;
      const moreUsers = await getSubscribedNotSubApprovedUsers(nextPageNumber);

      if (moreUsers.length > 0) {
        setUsers((prevUsers) => [
          ...prevUsers,
          ...moreUsers.filter((newUser) => !prevUsers.some((user) => user.id === newUser.id)),
        ]);
        setHasMoreUsers(moreUsers.length > 0);
        setPageNumber(nextPageNumber);
      } else {
        setHasMoreUsers(false);
      }
    } catch (error) {
      console.error('Error loading more users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
        hasMoreUsers && !loading
      ) {
        loadMoreUsers();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMoreUsers]);

  const handleUserDeleted = (aaugUserId) => {
    setUsers(users.filter(user => user.id !== aaugUserId));
  };

  const handleUserApproved = (aaugUserId, isApproved) => {
    setUsers(users.map(user => user.id === aaugUserId ? { ...user, isApproved } : user));
  };

  const getProfilePictureUrl = (fileId) => {
    return fileId
      ? downloadFile(fileId)
      : defaultProfilePic;
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

  const handleAssignRolesClick = (userId, event) => {
    event.stopPropagation();
    setSelectedUserId(userId);
    setShowRolesModal(true);
  };

  const handleUserClick = (aaugUserId) => {
    navigate('/ExpandProfile', { state: { aaugUserId } });
  };

  if (loading && users.length === 0) {
    return <p className="text-center text-gray-600">Loading users...</p>;
  }

  return (
    <div className="max-w-xl p-4 mt-4">
      <h1 className="text-2xl font-bold mb-6">Subbed, waiting for approval</h1>
      <div className="flex flex-col gap-4">
        {sortedUsers.map((user) => (
          <div
            key={user.id}
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
              <h2 className="text-black text-lg font-semibold">{`${user.name} ${user.lastName}`}</h2>
              <p className="text-gray-900">{`${user.nameArmenian} ${user.lastNameArmenian}`}</p>
              <p className="text-gray-900">User ID: {user.userId}</p>
              <p className="text-gray-900">Email: {user.email || 'N/A'}</p>
            </div>
            {currentUser?.role?.toLowerCase() !== 'hanxnakhumb' && (
              <div className={`absolute right-4 top-4 flex flex-col gap-2`}>
                <ApproveSubButton aaugUserId={user.id} onUserApproved={handleUserApproved} onClick={(e) => e.stopPropagation()} className="text-sm px-3 py-1" />
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

      {loading && <p>Loading more users...</p>}
      {!hasMoreUsers && <p>No more users to load.</p>}
    </div>
  );
};

export default SubbedNotApprovedUserList;
