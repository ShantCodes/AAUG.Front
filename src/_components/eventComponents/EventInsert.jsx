import React, { useState, useEffect } from 'react';
import {
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  CalendarIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './eventStyles/EventInsert.css';
import DefaultPicture from '../../assets/polyforms-pfp.webp';
import { insertEvent, getReservedDates } from '../../services/eventsService/eventsService';
import { getUserProfile } from '../../services/userService/userSerice';
import { getProfilePictureUrl } from '../../services/downloadFileService/downloadFileService';
import { format } from 'date-fns';
import NotificationComponent from '../NotificationComponent';

const EventInsert = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(DefaultPicture);
  const [presentator, setPresentator] = useState('');
  const [presentatorUserId, setPresentatorUserId] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        const { profilePictureFileId, name, id } = userData;
        setProfilePictureUrl(profilePictureFileId ? getProfilePictureUrl(profilePictureFileId) : DefaultPicture);
        setPresentator(name);
        setPresentatorUserId(id);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setProfilePictureUrl(DefaultPicture);
      }
    };

    const fetchReservedDates = async () => {
      try {
        const dates = await getReservedDates();
        setReservedDates(dates);
      } catch (error) {
        console.error('Error fetching reserved dates:', error);
      }
    };

    fetchUserProfile();
    fetchReservedDates();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!eventTitle) newErrors.eventTitle = 'required';
    if (!eventDetails && descriptionExpanded) newErrors.eventDetails = 'required';
    if (!eventDate) newErrors.eventDate = 'required';
    if (!thumbnailFile) newErrors.thumbnailFile = 'required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const eventData = {
      eventTitle,
      eventDetails,
      eventDate,
      presentator,
      presentatorUserId,
      thumbnailFile,
    };

    try {
      const response = await insertEvent(eventData);
      if (response.status === 200) {
        setSubmissionSuccess(true);
        console.log('Event inserted successfully:', response.data);
      }
    } catch (error) {
      console.error('Error inserting event:', error);
    }
  };



  return (
    <div className="pt-2 w-full"> {/* Make sure this wrapper div is full width */}
      <div className={`shadow-md border bg-white border-gray-200 rounded-lg p-6 bg-${submissionSuccess ? 'white' : 'gray-100'} w-full`}>
        {submissionSuccess && (
          <div className="text-center mb-4 text-green-600 font-bold">
            Your Presentation has been submitted, waiting for approval.
          </div>
        )}
        <div className="flex items-center mb-4">
          <img
            src={profilePictureUrl}
            alt="User"
            className="rounded-full w-10 h-10 mr-4"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className={`w-full py-2 px-3 border ${errors.eventTitle ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer`}
            disabled={submissionSuccess}
          />
          {errors.eventTitle && <p className="text-red-500 text-sm">{errors.eventTitle}</p>}
        </div>
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Presenter"
            value={presentator}
            onChange={(e) => setPresentator(e.target.value)}
            className="py-2 px-3 border border-gray-300 rounded-full w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={submissionSuccess}
          />

          <div className="flex flex-col items-center">
            <label className="flex items-center text-gray-700 hover:text-blue-500 focus:outline-none cursor-pointer">
              <PhotoIcon className="w-6 h-6" />
              <span className="hidden sm:inline ml-2">Poster</span>
              <input
                type="file"
                onChange={(e) => setThumbnailFile(e.target.files[0])}
                className="hidden"
                disabled={submissionSuccess}
              />
            </label>
            {thumbnailFile && (
              <span className="text-sm text-gray-500 mt-1 text-center truncate max-w-[40px]">
                {thumbnailFile.name.length > 20
                  ? `${thumbnailFile.name.slice(0, 15)}...${thumbnailFile.name.split('.').pop()}`
                  : thumbnailFile.name}
              </span>
            )}
            {errors.thumbnailFile && <p className="text-red-500 text-sm">{errors.thumbnailFile}</p>}
          </div>


          <div className="flex flex-col items-center">
            <label className="flex items-center text-gray-700 hover:text-blue-500 focus:outline-none cursor-pointer">
              <CalendarIcon className="w-6 h-6" />
              <span className="hidden sm:inline ml-2">Date</span>
              <DatePicker
                selected={eventDate}
                onChange={(date) => setEventDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText=""
                dayClassName={date =>
                  reservedDates.some(reservedDate =>
                    date.getFullYear() === reservedDate.getFullYear() &&
                    date.getMonth() === reservedDate.getMonth() &&
                    date.getDate() === reservedDate.getDate()
                  ) ? 'reserved-date' : undefined
                }
                disabled={submissionSuccess}
                className="hidden"
                popperPlacement="bottom-end"
              />
            </label>
            {eventDate && (
              <span className="text-sm text-gray-500 mt-1 text-center">
                {format(eventDate, 'dd/MM/yyyy')}
              </span>
            )}
            {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate}</p>}
          </div>

          <button
            type="button"
            onClick={() => setDescriptionExpanded(!descriptionExpanded)}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500 focus:outline-none"
            disabled={submissionSuccess}
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6" />
            <span className="hidden sm:inline mt-1">Description</span>
          </button>
        </div>

        {descriptionExpanded && (
          <textarea
            placeholder="Write your description here..."
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
            className={`w-full mt-4 p-3 border ${errors.eventDetails ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            rows="4"
            disabled={submissionSuccess}
          ></textarea>
        )}
        {errors.eventDetails && <p className="text-red-500 text-sm">{errors.eventDetails}</p>}

        <div className="relative flex items-center justify-center mt-4">
          <div className="absolute left-0">
            <NotificationComponent />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            disabled={submissionSuccess}
          >
            Submit
            <RocketLaunchIcon className="w-5 h-5 ml-3" />
          </button>
        </div>


      </div>
    </div>
  );

};

export default EventInsert;


