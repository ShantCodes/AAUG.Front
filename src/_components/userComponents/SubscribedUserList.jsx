import React, { useEffect, useState } from 'react';
import AssignRolesModal from './AssignRolesModal';
import UserCard from './UserCard';
import { getSubscribedUsers, getAllRoles, getUserProfile } from '../../services/userService/userSerice';

const SubscribedUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        const userInfo = await getUserProfile();
        setCurrentUser(userInfo);

        // Fetch users for the initial page (1)
        const usersData = await getSubscribedUsers(1);
        setUsers(usersData);
        setHasMoreUsers(usersData.length > 0); // Check if more users can be loaded

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

  const loadMoreUsers = async () => {
    if (!hasMoreUsers || loading) return;

    setLoading(true);
    try {
      const nextPageNumber = pageNumber + 1;
      const moreUsers = await getSubscribedUsers(nextPageNumber);

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

  const handleAssignRolesClick = (userId) => {
    setSelectedUserId(userId);
    setShowRolesModal(true);
  };

  if (loading && users.length === 0) {
    return <p className="text-center text-gray-600">Loading users...</p>;
  }

  return (
    <div className="max-w-xl p-4 mt-4">
      <h1 className="text-2xl font-bold mb-6">Subscribed Users</h1>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onUserApproved={handleUserApproved}
            onUserDeleted={handleUserDeleted}
            onAssignRolesClick={handleAssignRolesClick}
            currentUserRole={currentUser?.role}
          />
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

export default SubscribedUserList;
