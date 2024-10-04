import React, { useState } from 'react';
import axios from 'axios';

const InsertSlideButton = () => {
    const [file, setFile] = useState(null);  // State for selected file
    const [description, setDescription] = useState('');  // State for description

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
            const formData = new FormData();
            formData.append('MediaFile', file);
            formData.append('Description', description);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            // API call to insert the file
            const response = await axios.post(
                'http://localhost:37523/api/SlideShow/InsertSlideShows',
                formData,
                config
            );
            console.log('File uploaded successfully:', response.data);

            // Optionally, handle UI update after file upload
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
