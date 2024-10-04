import React from 'react';

const SaveSlideButton = ({ selectedSlideIds, onSave }) => {
  const isButtonDisabled = selectedSlideIds.length === 0;

  return (
    <div className="flex justify-start"> {/* Ensure it's aligned to the left */}
      <button
        onClick={onSave}
        disabled={isButtonDisabled}
        className={`px-2 py-1 text-sm text-white rounded ${isButtonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 transition duration-200'}`}
      >
        Save Slides
      </button>
    </div>
  );
};

export default SaveSlideButton;
