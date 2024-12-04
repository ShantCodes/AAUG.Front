import React, { useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import html2canvas from 'html2canvas';

const ShareToInstagram = ({ eventId, title }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = async () => {
    setIsLoading(true);

    try {
      // Select the element to capture
      const eventCardElement = document.getElementById(`screenshot-content-${eventId}`);

      // Generate the canvas with CORS enabled
      const canvas = await html2canvas(eventCardElement, {
        scale: 2, // Higher resolution
        useCORS: true, // Enable CORS for external images
        backgroundColor: '#ffffff', // Ensure a white background
      });

      // Convert the canvas to an image
      const image = canvas.toDataURL('image/png');

      // Create a temporary download link
      const downloadLink = document.createElement('a');
      downloadLink.href = image;
      downloadLink.download = `${title}-event.png`;
      downloadLink.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center space-x-2 text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition"
      disabled={isLoading}
    >
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <SocialIcon network="instagram" style={{ height: 40, width: 40 }} />
        </>
      )}
    </button>
  );
};

export default ShareToInstagram;
