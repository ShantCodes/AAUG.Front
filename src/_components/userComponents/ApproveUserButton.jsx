// src/components/ApproveButton.js
import React from 'react';
import { approveAaugUser } from '../../services/userService/userSerice';

const ApproveButton = ({ aaugUserId, onUserApproved }) => {
  const handleApprove = async (isApproved, e) => {
    e.stopPropagation(); // Stop event propagation when approving/disapproving
    console.log('Approving user with ID:', aaugUserId, 'with status:', isApproved);
    try {
      await approveAaugUser(aaugUserId, isApproved);
      onUserApproved(aaugUserId, isApproved);
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={(e) => handleApprove(true, e)} // Pass the event to handleApprove
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
      >
        Approve
      </button>
      <button
        onClick={(e) => handleApprove(false, e)} // Pass the event to handleApprove
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors"
      >
        Disapprove
      </button>
    </div>
  );
};

export default ApproveButton;
