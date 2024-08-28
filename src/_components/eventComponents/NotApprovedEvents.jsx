import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import EventLikes from './EventLikes';
import Popup from './Popup';

const NotApprovedEvents = ({ eventId, title, presenter, caption, initialLikes, imageUrl, isLiked: initialIsLiked }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('jwtToken');

      const response = await axios.post(
        `http://localhost:37523/api/Events/LikeEvent/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
        setIsLiked(prevIsLiked => !prevIsLiked);
      }
    } catch (error) {
      console.error('Error liking the event:', error);
    }
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg p-6 mb-8 w-full sm:w-[40rem] h-auto transform transition-all duration-300 ${
        isHovered ? 'scale-100' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-center mb-1 text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-left">{presenter}</p>
      </div>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-56 sm:h-72 object-cover rounded-t-lg mb-4"
      />
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isHovered ? 'max-h-[1000px]' : 'max-h-16'
        }`}
      >
        <p className="text-gray-700 dark:text-gray-300 mb-5">{caption}</p>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={handleLike}
          className={`p-2 rounded-full transition-colors duration-300 ${
            isLiked ? 'text-red-500' : 'text-gray-500'
          } dark:text-gray-400`}
        >
          <FaHeart size={24} />
        </button>
        <span className="text-gray-600 dark:text-gray-400">{likes} Likes</span>
      </div>
      <button
        className="mt-4 text-blue-500 hover:underline dark:text-blue-300"
        onClick={() => setShowPopup(true)}
      >
        See who liked this event
      </button>

      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <EventLikes eventId={eventId} onClose={() => setShowPopup(false)} />
        </Popup>
      )}
    </div>
  );
};

export default NotApprovedEvents;
