import React, { useState } from 'react';
import { insertSlideShow } from '../../services/slideShow/SlideShowService';

const InsertSlideButton = () => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleInsertFile = async () => {
        if (!file) {
            alert("Please select a file before uploading.");
            return;
        }

        try {
            const token = localStorage.getItem('jwtToken');
            const response = await insertSlideShow(file, description, token);
            console.log('File uploaded successfully:', response.data);
            alert('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-2"
            />
            <input
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter description"
                className="border p-2 mb-2"
            />
            <button
                onClick={handleInsertFile}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Insert File
            </button>
        </div>
    );
};

export default InsertSlideButton;
