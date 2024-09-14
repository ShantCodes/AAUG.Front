import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteButton from './DeleteUserButton';
import ApproveButton from './ApproveUserButton';
import AssignRolesModal from './AssignRolesModal';
import { getUserInfo } from '../../services/authService/authService'; // Import the getUserInfo function
import defaultProfilePic from '../../assets/polyforms-pfp.webp'; // Import the default profile picture
import ApproveSubButton from './ApproveSubButton';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SubbedNotApprovedUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [expandedUserId, setExpandedUserId] = useState(null); // State for expanded user
  const [currentUser, setCurrentUser] = useState(null); // State to store current user info
  const jwtToken = localStorage.getItem('jwtToken');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        // Fetch current user info
        const userInfo = await getUserInfo(jwtToken);
        setCurrentUser(userInfo);

        // Fetch users
        const usersResponse = await axios.get('http://localhost:37523/api/AaugUser/GetSubscribedNotSubApprovedUsers', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setUsers(usersResponse.data);

        // Fetch roles
        try {
          const rolesResponse = await axios.get('http://localhost:37523/api/AaugUser/GetAllRoles', {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
          setRoles(rolesResponse.data);
        } catch (error) {
          console.warn('Error fetching roles:', error);
          setRoles([]); // Set roles to empty if the fetch fails
        }
      } catch (error) {
        console.error('Error fetching users or current user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndRoles();
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
      : defaultProfilePic; // Use the default profile picture if fileId is not available
  };

  const getBackgroundColor = (roles) => {
    if (roles.includes('Varich')) return 'bg-purple-200'; // Purple
    if (roles.includes('King')) return 'bg-yellow-200'; // Gold
    if (roles.includes('Hanxnakhumb')) return 'bg-sky-300'; // Blue
    if (roles.includes('Antam')) return 'bg-green-200'; // Green
    return 'bg-white'; // Default
  };

  const rolePriority = {
    King: 1,
    Varich: 2,
    Hanxnakhumb: 3,
    Antam: 4,
    Default: 5
  };

  const getUserRolePriority = (roles) => {
    for (const role of roles) {
      if (rolePriority[role] !== undefined) {
        return rolePriority[role];
      }
    }
    return rolePriority.Default;
  };

  const sortedUsers = [...users].sort((a, b) => getUserRolePriority(a.role) - getUserRolePriority(b.role));

  const handleAssignRolesClick = (userId) => {
    setSelectedUserId(userId);
    setShowRolesModal(true);
  };

  const handleExpand = (userId) => {
    setExpandedUserId(userId);
  };

  const handleCollapse = () => {
    setExpandedUserId(null);
  };

  const handleUserClick = (aaugUserId) => {
    navigate('/ExpandProfile', { state: { aaugUserId, jwtToken } }); // Navigate to ExpandProfile with userId and jwtToken
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading users...</p>;
  }

  return (
    <div className="max-w-xl p-4 mt-4">
      <h1 className="text-2xl font-bold mb-6">Subbed, waiting for approval</h1>
      <div className="flex flex-col gap-4">
        {sortedUsers.map((user) => (
          <div
            key={user.id}
            onMouseEnter={() => handleExpand(user.userId)}
            onMouseLeave={handleCollapse}
            onClick={() => handleUserClick(user.id)} // Add onClick to the entire card
            className={`relative flex items-center rounded-lg shadow p-4 transition-all duration-500 ease-in-out ${expandedUserId === user.userId ? 'h-44' : 'h-28'
              } overflow-hidden hover:bg-gray-200 ${getBackgroundColor(user.role)} cursor-pointer`} // Added cursor-pointer for visual feedback
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
            {currentUser?.role?.toLowerCase() !== 'hanxnakhumb' && ( // Conditionally render buttons
              <div className={`absolute right-4 top-4 flex flex-col gap-2 transition-opacity duration-500 ease-in-out ${expandedUserId === user.userId ? 'opacity-100' : 'opacity-0'
                }`}>
                <ApproveSubButton aaugUserId={user.id} jwtToken={jwtToken} onUserApproved={handleUserApproved} className="text-sm px-3 py-1" />                
              </div>
            )}
          </div>
        ))}
      </div>

      {showRolesModal && (
        <AssignRolesModal
          userId={selectedUserId}
          roles={roles}
          onClose={() => setShowRolesModal(false)}
          jwtToken={jwtToken}
          currentUserRoles={users.find(user => user.userId === selectedUserId)?.role || []} // Pass current roles
        />
      )}
    </div>
  );
};

export default SubbedNotApprovedUserList;
