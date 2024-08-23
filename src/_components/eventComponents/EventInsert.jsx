// src/components/EventInsert/EventInsert.jsx

import React, { useState } from 'react';
import { insertEvent } from '../../services/eventsService/eventsService';

const EventInsert = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [presentator, setPresentator] = useState('');
  const [presentatorUserId, setPresentatorUserId] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('EventTitle', eventTitle);
    formData.append('EventDetails', eventDetails);
    formData.append('EventDate', eventDate);
    formData.append('Presentator', presentator);
    formData.append('PresentatorUserId', presentatorUserId);
    formData.append('ThumbNailFile', thumbnailFile);

    const result = await insertEvent(formData);
    if (result.success) {
      alert('Event inserted successfully');
      // Clear form fields after submission
      setEventTitle('');
      setEventDetails('');
      setEventDate('');
      setPresentator('');
      setPresentatorUserId('');
      setThumbnailFile(null);
    } else {
      alert('Failed to insert event');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full sm:w-[40rem] h-auto">
        <h2 className="text-lg font-bold text-center mb-4">Add Presentation</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventTitle">
              Title
            </label>
            <input
              type="text"
              id="eventTitle"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDetails">
              Description
            </label>
            <textarea
              id="eventDetails"
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
              rows="6" // Adjust this number to make it taller
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
              Date
            </label>
            <input
              type="date"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="presentator">
              Name
            </label>
            <input
              type="text"
              id="presentator"
              value={presentator}
              onChange={(e) => setPresentator(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnailFile">
              Image or Poster
            </label>
            <input
              type="file"
              id="thumbnailFile"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventInsert;