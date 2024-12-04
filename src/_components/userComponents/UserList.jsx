import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssignRolesModal from './AssignRolesModal';
import UserCard from './UserCard';
import { getApprovedUsers, getAllRoles, getUserProfile } from '../../services/userService/userSerice';
import { Atom } from 'react-loading-indicators';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        const userInfo = await getUserProfile();
        setCurrentUser(userInfo);

        // Fetch users for the initial page (1)
        const usersData = await getApprovedUsers(1);
        setUsers(usersData); // Set the initial users directly
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
    if (!hasMoreUsers || loading) return; // Prevent loading if there's no more data or already loading

    setLoading(true);
    try {
      const nextPageNumber = pageNumber + 1; // Increment page number for the next fetch
      const moreUsers = await getApprovedUsers(nextPageNumber);

      if (moreUsers.length > 0) {
        setUsers((prevUsers) => [
          ...prevUsers,
          ...moreUsers.filter((newUser) => !prevUsers.some((user) => user.id === newUser.id)),
        ]);
        setHasMoreUsers(moreUsers.length > 0); // Update whether there are more users to fetch
        setPageNumber(nextPageNumber); // Update the page number after successful fetch
      } else {
        setHasMoreUsers(false); // No more users to load
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
        loadMoreUsers(); // Call the loadMoreUsers function directly
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

  const handleUserClick = (aaugUserId) => {
    navigate('/ExpandProfile', { state: { aaugUserId } });
  };

  if (loading && users.length === 0) {
    return <div
      className="fixed inset-0 bg-transparent flex justify-center items-center"

    >
      <Atom color="#6a7bfb" size="medium" />
    </div>;
  }

  return (
    <div className="max-w-xl p-4 mt-4">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div key={user.id} onClick={() => handleUserClick(user.id)}>
            <UserCard
              user={user}
              onUserApproved={handleUserApproved}
              onAssignRolesClick={handleAssignRolesClick}
              currentUserRole={currentUser?.role}
            />
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

export default UsersList;
