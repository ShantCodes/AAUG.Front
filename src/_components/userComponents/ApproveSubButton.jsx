// src/components/ApproveSubButton.js
import React from 'react';
import { approveSubscription } from '../../services/userService/userSerice';

const ApproveSubButton = ({ aaugUserId, onUserApproved }) => {
  const handleApprove = async (isApproved) => {
    console.log('Approving user with ID:', aaugUserId, 'with status:', isApproved);
    try {
      await approveSubscription(aaugUserId, isApproved);
      onUserApproved(aaugUserId, isApproved);
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => handleApprove(true)}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
      >
        ApproveSub
      </button>
      <button
        onClick={() => handleApprove(false)}
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors"
      >
        DisapproveSub
      </button>
    </div>
  );
};

export default ApproveSubButton;
