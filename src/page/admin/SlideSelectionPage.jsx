import React, { useState } from 'react';
import SlideSelection from '../../_components/slideShowComponents/SlideSelection';
import SaveSlideButton from '../../_components/slideShowComponents/SaveSlideButton';
import InsertSlidePopup from '../../_components/slideShowComponents/InsertSlidePopup';  // Import the popup component
import SlideShowTitleInput from '../../_components/slideShowComponents/SlideShowTitleInput'; // Import the input component
import axios from 'axios';

const SlideSelectionPage = () => {
  const [selectedSlideIds, setSelectedSlideIds] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);  // State to control popup visibility

  const handleSave = async () => {
    console.log('Selected Slide IDs for Save:', selectedSlideIds);
    if (selectedSlideIds.length === 0) return;

    try {
      const token = localStorage.getItem('jwtToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      // API call to save selected slides
      const response = await axios.put(
        'http://localhost:37523/api/SlideShow/SelectSlides',
        selectedSlideIds, // Send selected slide IDs
        config
      );
      console.log('Slides saved successfully:', response.data);

      window.location.reload();
    } catch (error) {
      console.error('Error saving slides:', error.response ? error.response.data : error.message);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);  // Toggle the popup state
  };

  return (
    <div className="">
      {/* Centered buttons and title input */}
      <div className="flex justify-center mb-4 mt-20 items-center space-x-4 "> {/* Centering with space between items */}
        <SaveSlideButton
          selectedSlideIds={selectedSlideIds}
          onSave={handleSave}
        />

        {/* Button to open the popup */}
        <button
          onClick={togglePopup}
          className="bg-green-500 text-white p-2 rounded"
        >
          Insert Slide
        </button>

        {/* SlideShowTitleInput component moved to the right */}
        <SlideShowTitleInput className="ml-4" />
      </div>

      <SlideSelection
        selectedSlideIds={selectedSlideIds}
        setSelectedSlideIds={setSelectedSlideIds}
      />

      {/* InsertSlidePopup component */}
      <InsertSlidePopup
        isOpen={isPopupOpen}
        onClose={togglePopup}  // Pass close handler to the popup
      />
    </div>
  );
};

export default SlideSelectionPage;
