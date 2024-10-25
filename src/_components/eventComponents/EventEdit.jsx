import React, { useState } from 'react';
import { updateEvent } from '../../services/eventsService/eventsService';

const EventEdit = ({ eventId, title, presenter, caption, imageUrl, onClose }) => {
  const [formData, setFormData] = useState({
    Id: eventId,
    EventTitle: title || '',
    EventDetails: caption || '',
    EventDate: '', // You may need to add this if you have a date field
    Presentator: presenter || '',
    ThumbNailFile: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await updateEvent(formDataToSend); // Call the service function

      alert('Event updated successfully');
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error('There was an error updating the event!', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            Event Title:
            <input
              type="text"
              name="EventTitle"
              value={formData.EventTitle}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </label>
          <label className="block mb-4">
            Event Details:
            <textarea
              name="EventDetails"
              value={formData.EventDetails}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </label>
          <label className="block mb-4">
            Event Date:
            <input
              type="datetime-local"
              name="EventDate"
              value={formData.EventDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </label>
          <label className="block mb-4">
            Presenter:
            <input
              type="text"
              name="Presentator"
              value={formData.Presentator}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </label>
          <label className="block mb-4">
            Thumbnail File:
            <input
              type="file"
              name="ThumbNailFile"
              onChange={handleChange}
              className="w-full"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventEdit;
