import React, { useState } from 'react';
import SlideSelection from '../../_components/slideShowComponents/SlideSelection';
import SaveSlideButton from '../../_components/slideShowComponents/SaveSlideButton';
import InsertSlidePopup from '../../_components/slideShowComponents/InsertSlidePopup';
import SlideShowTitleInput from '../../_components/slideShowComponents/SlideShowTitleInput';
import { saveSelectedSlides } from '../../services/slideShow/SlideShowService';

const SlideSelectionPage = () => {
  const [selectedSlideIds, setSelectedSlideIds] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSave = async () => {
    console.log('Selected Slide IDs for Save:', selectedSlideIds);
    if (selectedSlideIds.length === 0) return;

    try {
      await saveSelectedSlides(selectedSlideIds);
      window.location.reload();
    } catch (error) {
      console.error('Error saving slides:', error.message);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-4 mt-20">
        {/* Save Button */}
        <SaveSlideButton
          selectedSlideIds={selectedSlideIds}
          onSave={handleSave}
          className="w-full md:w-auto"
        />
        {/* Insert Slide Button */}
        <button
          onClick={togglePopup}
          className="bg-green-500 text-white p-2 rounded w-full md:w-auto"
        >
          Insert Slide
        </button>
        {/* Slide Show Title Input */}
        <SlideShowTitleInput className="w-full md:w-auto" />
      </div>

      {/* Slide Selection Section */}
      <div className="mt-4">
        <SlideSelection
          selectedSlideIds={selectedSlideIds}
          setSelectedSlideIds={setSelectedSlideIds}
        />
      </div>

      {/* Insert Slide Popup */}
      <InsertSlidePopup isOpen={isPopupOpen} onClose={togglePopup} />
    </div>
  );
};

export default SlideSelectionPage;
