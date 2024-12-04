import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { likeEvent, deleteEvent, checkIfLiked } from '../../services/eventsService/eventsService'; // Import the service
import EventLikes from './EventLikes';
import Popup from './Popup';
import EventEdit from './EventEdit';
import ShareToInstagram from './ShareToInstagram';
import ShareToTelegram from './ShareToTelegram';

const EventCard = ({ eventId, title, presenter, caption, presentatorUserId, initialLikes, imageUrl, currentInfo, userRole, onRemove, eventDate }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Changed from isHovered to isExpanded
  const [showPopup, setShowPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const fetchIsLiked = async () => {
      try {
        const response = await checkIfLiked(eventId);
        setIsLiked(response);
      } catch (error) {
        console.log('not logged in');
      }
    };
    fetchIsLiked();
  }, [eventId]);

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
    const success = await deleteEvent(eventId);
    if (success) {
      console.log('Event deleted successfully');
      onRemove(eventId); // Notify parent to remove the event
    }
  };

  const currentId = currentInfo?.id ? String(currentInfo.id) : null;
  const presenterId = String(presentatorUserId);

  const canEdit = currentId === presenterId || ["Varich", "King", "Hanxnakhumb"].includes(userRole);
  const canDelete = ["Varich", "King", "Hanxnakhumb"].includes(userRole);

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg pt-10 pb-10 p-4 mb-4 transform transition-all duration-300 group"
      onClick={() => setIsExpanded(prev => !prev)} // Toggle image expansion on clicking anywhere on the card
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-center mb-1 text-gray-900">{title}</h3>
        <p className="text-gray-700 text-left mb-2">{presenter}</p>
        <p className="text-gray-700 text-left">{eventDate}</p>
      </div>

      {/* Image Container */}
      <div
        className={`mb-4 overflow-hidden transition-all duration-1000 ease-in-out ${isExpanded ? 'max-h-[1000px]' : 'max-h-56'} flex items-center`}
      >
        <img
          src={imageUrl}
          alt={title}
          className={`w-full object-cover transition-all duration-1000 ease-in-out ${isExpanded ? 'object-center' : 'object-cover'}`}
        />
      </div>

      <div className={`transition-all duration-1000 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-16'}`}>
        <p className="text-gray-700 mb-5">{caption}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
          >
            <FaHeart size={24} />
          </button>
          <span className="text-gray-600 ml-2">{likes} Likes</span>
        </div>

        {/* Share to Telegram */}
        <div className="mt-4 flex justify-center">
          <ShareToTelegram title={title} description={caption} imageUrl={imageUrl} />
        </div>
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
