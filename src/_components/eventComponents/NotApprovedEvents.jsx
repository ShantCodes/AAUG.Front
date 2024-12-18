import React, { useState, useEffect } from 'react';
import { approveEvent, deleteEvent } from '../../services/eventsService/eventsService';
import EventEdit from './EventEdit';
import { TrashIcon, HandThumbUpIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const NotApprovedEvents = ({ eventId, title, presenter, caption, imageUrl, initialIsLiked, onRemove, eventDate }) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isHovered, setIsHovered] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleApprove = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const success = await approveEvent(eventId, token);
      if (success) {
        console.log('Event approved successfully');
        onRemove(eventId); // Remove the event from the list
      }
    } catch (error) {
      console.error('Error approving the event:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const success = await deleteEvent(eventId, token);
      if (success) {
        console.log('Event deleted successfully');
        onRemove(eventId); // Remove the event from the list
      }
    } catch (error) {
      console.error('Error deleting the event:', error);
    }
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg p-6 mb-8 sm:w-[40rem] h-auto transform transition-all duration-300 ${isHovered ? 'scale-100' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-center mb-1 text-gray-900">{title}</h3>
        <p className="text-gray-700 mb-2 text-left">{presenter}</p>
        <p className="text-gray-700 text-left">{eventDate}</p>
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
      <div className="flex justify-between items-center mt-4">
        <div className="flex">
          <button
            className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-100 transition flex items-center"
            onClick={handleApprove}
          >
            <HandThumbUpIcon className="h-5 w-5 " />
          </button>
          <button
            className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-100 transition flex items-center"
            onClick={handleDelete}
          >
            <TrashIcon className="h-5 w-5 " />
          </button>
        </div>
        <button
          className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-100 transition flex items-center"
          onClick={() => setShowEdit(true)}
        >
          <PencilSquareIcon className="h-5 w-5 " />
        </button>
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
    </div>
  );
};

export default NotApprovedEvents;
