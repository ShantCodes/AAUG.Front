import React, { useEffect, useState } from 'react';
import { getEventLikes } from '../../services/eventsService/eventsService';
import { getProfilePictureUrl } from '../../services/downloadFileService/downloadFileService'; // Import the getProfilePictureUrl function
import defaultProfilePicture from '../../assets/polyforms-pfp.webp';
import { Atom } from 'react-loading-indicators';

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
    return (
      <div
        className="fixed inset-0 bg-transparent flex justify-center items-center"
        onClick={onClose}
      >
        <Atom color="#aaffd2" size="medium" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-transparent p-6 rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          {/* Add an "X" icon or any other close icon here */}
        </button>
        <h3 className="text-lg font-bold text-white mb-4">Likes:</h3>
        {likes.length > 0 ? (
          <ul className="list-none p-0 m-0">
            {likes.map((like) => (
              <li key={like.user.id} className="flex items-center mb-2 text-white">
                <img
                  src={like.user.profilePictureFileId
                    ? getProfilePictureUrl(like.user.profilePictureFileId)
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
