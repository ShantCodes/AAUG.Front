// src/components/EventCard/EventCard.jsx

import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const EventCard = ({ title, presenter, caption, initialLikes, imageUrl }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 mb-8 w-full sm:w-[40rem] h-auto transform transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-center mb-1">{title}</h3>
        <p className="text-black text-left">{presenter}</p>
      </div>
      <img
        src={imageUrl || exampleImage}
        alt={title}
        className="w-full h-56 sm:h-72 object-cover rounded-t-lg mb-4"
      />
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isHovered ? 'max-h-[500px]' : 'max-h-16'
          }`}
      >
        <p className="text-gray-700 mb-5">{caption}</p>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={handleLike}
          className={`p-2 rounded-full ${isLiked ? 'text-red-500' : 'text-gray-500'
            } transition-colors duration-300`}
        >
          <FaHeart size={24} />
        </button>
        <span className="text-gray-600">{likes} Likes</span>
      </div>
    </div>
  );
};

export default EventCard;