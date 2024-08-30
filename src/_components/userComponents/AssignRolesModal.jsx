import React, { useState } from 'react';
import axios from 'axios';

const AssignRolesModal = ({ userId, roles, onClose, jwtToken }) => {
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleRoleChange = (event) => {
    setSelectedRoleId(parseInt(event.target.value));
  };

  const handleAssignRole = async () => {
    if (!selectedRoleId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post(
        `http://localhost:37523/api/AaugUser/AssignRolesToUser/${userId}/${selectedRoleId}`,
        null, // No body required for this endpoint
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      onClose(); // Close the modal on success
    } catch (error) {
      setError('Failed to assign role. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Assign Role</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium mb-2">Select Role</label>
          <select
            id="role"
            value={selectedRoleId || ''}
            onChange={handleRoleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a role</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleAssignRole}
            disabled={isSubmitting}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Assigning...' : 'Assign Role'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignRolesModal;
