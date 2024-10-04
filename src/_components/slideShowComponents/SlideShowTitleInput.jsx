import React, { useState } from 'react';
import axios from 'axios';

const SlideShowTitleInput = () => {
    const [title, setTitle] = useState('');

    const handleInputChange = (event) => {
        console.log('Input changed:', event.target.value); // Log the input value for debugging
        setTitle(event.target.value); // Update the title state
    };

    const handleSave = async () => {
        const jwtToken = localStorage.getItem('jwtToken'); // Get the JWT token from local storage

        // Check if title is not empty
        if (!title) {
            console.error('Title is required');
            return; // Prevent empty submissions
        }

        // Prepare FormData
        const formData = new FormData();
        formData.append('Description', title); // Use the correct key here as per your API

        console.log('FormData being sent:', formData); // Log the FormData for debugging

        try {
            const response = await axios.post(
                'http://localhost:37523/api/SlideShow/InsertSlideShowTitle',
                formData, // Send FormData
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`, // Set the authorization header
                        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                    },
                }
            );

            console.log('SlideShow title saved:', response.data); // Log the response
            setTitle(''); // Reset the input field after saving
        } catch (error) {
            console.error('Error saving SlideShow title:', error.response?.data || error.message); // Log any errors
        }
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={title}
                onChange={handleInputChange} // Set the input change handler
                placeholder="Change main title"
                className="border p-2 rounded-l" // Input styles
            />
            <button
                onClick={handleSave} // Set the save button click handler
                className="bg-blue-500 text-white p-2 rounded-r" // Button styles
            >
                Save
            </button>
        </div>
    );
};

export default SlideShowTitleInput;
