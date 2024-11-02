import React, { useState, useEffect } from 'react';
import { assignRoleToUser, unassignRoleFromUser } from '../../services/userService/userSerice';

const AssignRolesModal = ({ userId, roles = [], onClose, currentUserRoles = [] }) => {
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    setUserRoles(currentUserRoles.map(roleName => {
      const role = roles.find(r => r.name === roleName);
      return role ? { id: role.id, name: role.name } : null;
    }).filter(role => role !== null));
  }, [userId, currentUserRoles, roles]);

  const handleRoleChange = (event) => {
    setSelectedRoleId(event.target.value || null);
  };

  const handleAssignRole = async () => {
    if (!selectedRoleId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await assignRoleToUser(userId, selectedRoleId);
      const assignedRole = roles.find(role => role.id === parseInt(selectedRoleId, 10));
      if (assignedRole) {
        setUserRoles(prevRoles => [...prevRoles, assignedRole]);
      }
      setSelectedRoleId(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnassignRole = async (roleId) => {
    if (!roleId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await unassignRoleFromUser(userId, roleId);
      setUserRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" style={{ zIndex: 9999 }}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Assign or Unassign Roles</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Current Roles</label>
          <div className="flex flex-wrap gap-2">
            {userRoles.length > 0 ? (
              userRoles.map(role => (
                <div key={role.id} className="flex items-center bg-gray-200 p-2 rounded">
                  <span className="mr-2">{role.name}</span>
                  <button
                    onClick={() => handleUnassignRole(role.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    &times;
                  </button>
                </div>
              ))
            ) : (
              <p>No roles assigned.</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium mb-2">Assign a New Role</label>
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
