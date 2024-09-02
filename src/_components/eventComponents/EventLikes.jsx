import React, { useEffect, useState } from 'react';
import { getEventLikes } from '../../services/eventsService/eventsService';
import defaultProfilePicture from '../../assets/polyforms-pfp.webp'; // Import the default profile picture

const EventLikes = ({ eventId, onClose }) => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likedUsers = await getEventLikes(eventId);
        setLikes(likedUsers);
      } catch (error) {
        setError('Failed to load users who liked this event');
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [eventId]);

  if (loading) {
    return <p>Loading likes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center"
      onClick={onClose} // Close the popup when clicking on the overlay
    >
      <div
        className="bg-transparent p-6 rounded-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the content from closing the overlay
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          {/* You can add an "X" icon or any other close icon here */}
        </button>
        <h3 className="text-lg font-bold text-white mb-4">Likes:</h3>
        {likes.length > 0 ? (
          <ul className="list-none p-0 m-0">
            {likes.map((like) => (
              <li key={like.user.id} className="flex items-center mb-2 text-white">
                <img
                  src={like.user.profilePictureFileId 
                        ? `http://localhost:37523/api/Media/DownloadFile/${like.user.profilePictureFileId}` 
                        : defaultProfilePicture}
                  alt={`${like.user.name} ${like.user.lastName}`}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <span>{`${like.user.name} ${like.user.lastName}`}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No users have liked this event yet.</p>
        )}
      </div>
    </div>
  );
};

export default EventLikes;
