import React from 'react';
import { deleteUser } from '../../services/userService/userSerice';

const DeleteButton = ({ aaugUserId, onUserDeleted }) => {
  const handleDelete = async () => {
    try {
      await deleteUser(aaugUserId);
      onUserDeleted(aaugUserId);
    } catch (error) {
      console.error('Error deleting user:', error.message);
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
