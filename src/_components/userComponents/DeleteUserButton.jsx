import React from 'react';
import axios from 'axios';

const DeleteButton = ({ aaugUserId, jwtToken, onUserDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:37523/api/AaugUser/DeleteUser/${aaugUserId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      onUserDeleted(aaugUserId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
