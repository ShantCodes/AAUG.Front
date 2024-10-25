import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { likeEvent, deleteEvent } from '../../services/eventsService/eventsService'; // Import the service
import EventLikes from './EventLikes';
import Popup from './Popup';
import EventEdit from './EventEdit';

const EventCard = ({ eventId, title, presenter, caption, presentatorUserId, initialLikes, imageUrl, isLiked: initialIsLiked, currentInfo, userRole, onRemove }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleLike = async () => {
    try {
      const response = await likeEvent(eventId);

      if (response.status === 200) {
        setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
        setIsLiked(prevIsLiked => !prevIsLiked);
      }
    } catch (error) {
      console.error('Error liking the event:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteEvent(eventId);

      if (response.status === 200) {
        console.log('Event deleted successfully');
        onRemove(eventId); // Notify parent to remove the event
      }
    } catch (error) {
      console.error('Error deleting the event:', error);
    }
  };

  const currentId = currentInfo?.id ? String(currentInfo.id) : null;
  const presenterId = String(presentatorUserId);

  const canEdit = currentId === presenterId || ["Varich", "King", "Hanxnakhumb"].includes(userRole);
  const canDelete = ["Varich", "King", "Hanxnakhumb"].includes(userRole);

  return (
    <div
      className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-4 transform transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-center mb-1 text-gray-900">{title}</h3>
        <p className="text-gray-700 text-left">{presenter}</p>
      </div>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-56 sm:h-72 object-cover rounded-t-lg mb-4"
      />
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isHovered ? 'max-h-[1000px]' : 'max-h-16'}`}
      >
        <p className="text-gray-700 mb-5">{caption}</p>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={handleLike}
          className={`p-2 rounded-full transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
        >
          <FaHeart size={24} />
        </button>
        <span className="text-gray-600">{likes} Likes</span>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className="text-blue-500 hover:underline"
          onClick={() => setShowPopup(true)}
        >
          See who liked this event
        </button>

        {(canEdit || canDelete) && (
          <div className="flex space-x-2">
            {console.log('currentId:', currentId, 'presenterId:', presenterId, 'canEdit:', canEdit)}
            {canEdit && (
              <button
                className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-100 transition flex items-center"
                onClick={() => setShowEdit(true)}
              >
                <PencilSquareIcon className="h-5 w-5" />
              </button>
            )}
            {canDelete && (
              <button
                className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-100 transition flex items-center"
                onClick={handleDelete}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>

      {showEdit && (
        <EventEdit
          eventId={eventId}
          title={title}
          presenter={presenter}
          caption={caption}
          imageUrl={imageUrl}
          onClose={() => setShowEdit(false)}
        />
      )}

      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <EventLikes eventId={eventId} onClose={() => setShowPopup(false)} />
        </Popup>
      )}
    </div>
  );
};

export default EventCard;
