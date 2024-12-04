import React, { useEffect, useState } from 'react';
import UserCard from './UserCard'; // Update the import
import { getUserProfile, getNotApprovedUsers } from '../../services/userService/userSerice';
import defaultProfilePic from '../../assets/polyforms-pfp.webp';
import { useNavigate } from 'react-router-dom';

const NotApprovedUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await getUserProfile();
        setCurrentUser(userInfo);

        // Fetch users for the initial page (1)
        const usersData = await getNotApprovedUsers(1);
        setUsers(usersData);
        setHasMoreUsers(usersData.length > 0); // Check if more users can be loaded
      } catch (error) {
        console.error('Error fetching users or current user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (aaugUserId) => {
    navigate('/ExpandProfile', { state: { aaugUserId } });
  };

  const loadMoreUsers = async () => {
    if (!hasMoreUsers || loading) return; // Prevent loading if there's no more data or already loading

    setLoading(true);
    try {
      const nextPageNumber = pageNumber + 1; // Increment page number for the next fetch
      const moreUsers = await getNotApprovedUsers(nextPageNumber);

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
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
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

  if (loading && users.length === 0) {
    return <p className="text-center text-gray-600">Loading users...</p>;
  }

  return (
    <div className="max-w-xl p-4 mt-4">
      <h1 className="text-2xl font-bold mb-6">New signed up</h1>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div key={user.id} onClick={() => handleUserClick(user.id)}>
            <UserCard
              key={user.id}
              user={user}
              onUserApproved={handleUserApproved}
              onUserDeleted={handleUserDeleted} // Pass the delete handler
              currentUserRole={currentUser?.role}
            />
          </div>
        ))}
      </div>
      {loading && <p>Loading more users...</p>}
      {!hasMoreUsers && <p>No more users to load.</p>}
    </div>
  );
};

export default NotApprovedUserList;
