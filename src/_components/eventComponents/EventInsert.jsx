import React, { useState, useEffect } from 'react';
import {
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  CalendarIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const EventInsert = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const response = await axios.get('http://localhost:37523/api/AaugUser/GetCurrentUserInfo', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const { profilePictureFileId } = response.data;
          const pictureUrl = profilePictureFileId
            ? `http://localhost:37523/api/Media/DownloadFile/${profilePictureFileId}`
            : '/default-profile.png';
          setProfilePictureUrl(pictureUrl);
        } else {
          setProfilePictureUrl('/default-profile.png');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setProfilePictureUrl('/default-profile.png');
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('EventTitle', eventTitle);
    formData.append('EventDate', eventDate ? format(eventDate, 'yyyy-MM-dd') : '');
    formData.append('ThumbNailFile', thumbnailFile);
    formData.append('PhotoFile', photoFile);

    // Call your insertEvent service here
    // const result = await insertEvent(formData);
    // Handle success/failure based on the result
  };

  return (
    <div className="flex flex-col items-center pt-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-[40rem] max-w-screen-sm">
        <div className="flex items-center mb-4">
          {/* Profile Thumbnail */}
          <img
            src={profilePictureUrl}
            alt="User"
            className="rounded-full w-10 h-10 mr-4"
          />
          <input
            type="text"
            placeholder="What on your mind?"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Name"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="py-2 px-3 border border-gray-300 rounded-full w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <label className="flex items-center text-gray-700 hover:text-blue-500 focus:outline-none cursor-pointer">
            <PhotoIcon className="w-6 h-6 mr-2" />
            <span>Poster</span>
            <input
              type="file"
              onChange={(e) => setPhotoFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          <label className="flex items-center text-gray-700 hover:text-blue-500 focus:outline-none cursor-pointer">
            <CalendarIcon className="w-6 h-6 mr-2" />
            <span>Date</span>
            <DatePicker
              selected={eventDate}
              onChange={(date) => setEventDate(date)}
              dateFormat="dd/MM/yyyy"
              className="hidden"
              placeholderText="Select Date"
            />
          </label>

          <button
            type="button"
            onClick={() => setDescriptionExpanded(!descriptionExpanded)}
            className="flex items-center text-gray-700 hover:text-blue-500 focus:outline-none"
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2" />
            <span>Description</span>
          </button>
        </div>

        {/* Conditionally render expanded description */}
        {descriptionExpanded && (
          <textarea
            placeholder="Write your description here..."
            className="w-full mt-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
          ></textarea>
        )}

        <div className="flex items-center justify-center mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            Submit
            <RocketLaunchIcon className="w-4 h-4 ml-2" /> {/* Adjust icon size and spacing */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventInsert;
