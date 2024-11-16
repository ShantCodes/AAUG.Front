// SlideSelectionPage.js
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
    <div className="">
      <div className="flex justify-center mb-4 mt-20 items-center space-x-4">
        <SaveSlideButton
          selectedSlideIds={selectedSlideIds}
          onSave={handleSave}
        />
        <button onClick={togglePopup} className="bg-green-500 text-white p-2 rounded">
          Insert Slide
        </button>
        <SlideShowTitleInput className="ml-4" />
      </div>
      <SlideSelection
        selectedSlideIds={selectedSlideIds}
        setSelectedSlideIds={setSelectedSlideIds}
      />
      <InsertSlidePopup
        isOpen={isPopupOpen}
        onClose={togglePopup}
      />
    </div>
  );
};

export default SlideSelectionPage;
