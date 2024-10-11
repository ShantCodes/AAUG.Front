import React, { useState } from 'react';
import axios from 'axios';

const InsertSlidePopup = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');

  if (!isOpen) return null; // Ensure modal is only rendered when open

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleInsertFile = async () => {
    if (!file) {
      alert('Please select a file before uploading.');
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const formData = new FormData();
      formData.append('MediaFile', file);
      formData.append('Description', description);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post(
        'http://localhost:37523/api/SlideShow/InsertSlideShows',
        formData,
        config
      );
      console.log('File uploaded successfully:', response.data);

      alert('File uploaded successfully');
      onClose(); // Close modal after file upload
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg z-50">
        <h2 className="text-lg font-bold mb-4">Upload Slide</h2>

        <input 
          type="file" 
          onChange={handleFileChange} 
          className="mb-4 border p-2 w-full"
        />
        
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter description"
          className="border p-2 mb-4 w-full"
        />

        <div className="flex justify-end">
          <button
            onClick={handleInsertFile}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Upload
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsertSlidePopup;