import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteButton from './DeleteUserButton';
import ApproveButton from './ApproveUserButton';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const jwtToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:37523/api/AaugUser/GetAllUsers', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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

  if (loading) {
    return <p className="text-center text-gray-600">Loading users...</p>;
  }

  return (
    <div className="max-w-xl p-4">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="relative flex items-center bg-white rounded-lg shadow p-4 hover:bg-gray-200 transition-colors"
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
            <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 hover:opacity-100 transition-opacity">
              <ApproveButton aaugUserId={user.id} jwtToken={jwtToken} onUserApproved={handleUserApproved} />
              <DeleteButton aaugUserId={user.id} jwtToken={jwtToken} onUserDeleted={handleUserDeleted} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
