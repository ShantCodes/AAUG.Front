// src/components/EventLikes/EventLikes.jsx

import React, { useEffect, useState } from 'react';
import { getEventLikes } from '../../services/eventsService/eventsService';

const EventLikes = ({ eventId }) => {
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
  <div>
    <h3 className="text-lg font-bold mb-4">Likes:</h3>
    {likes.length > 0 ? (
      <ul className="list-none">
        {likes.map((like) => (
          <li key={like.user.id} className="flex items-center mb-2">
            <img
              src={`http://localhost:37523/api/Media/DownloadFile/${like.user.profilePictureFileId}`}
              alt={`${like.user.name} ${like.user.lastName}`}
              className="w-8 h-8 rounded-full mr-3"
            />
            <span>{`${like.user.name} ${like.user.lastName}`}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p>No users have liked this event yet.</p>
    )}
  </div>
);

};

export default EventLikes;
