import React, { useEffect, useState } from 'react';
import { getSlidesForAdmin } from '../../services/slideShow/SlideShowService'; // Adjust import based on your file structure
import DeleteButton from './DeleteSlideButton';
import { downloadFile } from '../../services/downloadFileService/downloadFileService';
import MobileNavMenu from '../MobileNavMenu';

const SlideSelection = ({ selectedSlideIds, setSelectedSlideIds }) => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await getSlidesForAdmin(token);
        setSlides(response.data);
      } catch (error) {
        console.error('Error fetching slides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const handleCardClick = (id) => {
    setSelectedSlideIds((prevIds) => {
      const updatedIds = prevIds.includes(id)
        ? prevIds.filter((slideId) => slideId !== id)
        : [...prevIds, id];

      console.log('Updated Selected Slide IDs:', updatedIds);
      return updatedIds;
    });
  };

  const handleSlideDeleted = (slideId) => {
    setSlides((prevSlides) => prevSlides.filter((slide) => slide.id !== slideId));
  };

  return (
    <div className="container mx-auto p-4">
      {/* MobileNavMenu for mobile screens */}
      <div className="lg:hidden">
        <MobileNavMenu />
      </div>
      {loading ? (
        <p>Loading slides...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`border p-4 rounded-lg shadow-lg flex flex-col ${selectedSlideIds.includes(slide.id) ? 'bg-green-600' : slide.isActive ? 'bg-green-200' : 'bg-white'}`}
              onClick={() => handleCardClick(slide.id)}
            >
              <h2 className="text-lg font-semibold">{slide.description}</h2>
              {slide.mediaFileId && (
                <img
                  src={`${downloadFile(slide.mediaFileId)}`}
                  alt={slide.description}
                  className="mt-2 w-full h-auto rounded-lg"
                />
              )}
              <div className="flex justify-end mt-4">
                <DeleteButton slideId={slide.id} onSlideDeleted={handleSlideDeleted} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SlideSelection;
