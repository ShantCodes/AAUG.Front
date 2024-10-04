import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteButton from './DeleteSlideButton'; // Adjust the import based on your file structure

const SlideSelection = ({ selectedSlideIds, setSelectedSlideIds }) => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = 'http://localhost:37523';

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${BASE_URL}/api/SlideShow/GetSlideShowsFrAdmins`, config);
        setSlides(response.data);
      } catch (error) {
        console.error('Error fetching slides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [BASE_URL]);

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
      {loading ? (
        <p>Loading slides...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`border p-4 rounded-lg shadow-lg flex flex-col ${selectedSlideIds.includes(slide.id) ? 'bg-green-600' : slide.isActive ? 'bg-green-200' : 'bg-white'}`}
              onClick={() => handleCardClick(slide.id)} // Handle selection
            >
              <h2 className="text-lg font-semibold">{slide.description}</h2>
              {slide.mediaFileId && (
                <img
                  src={`${BASE_URL}/api/Media/DownloadFile/${slide.mediaFileId}`}
                  alt={slide.description}
                  className="mt-2 w-full h-auto rounded-lg"
                />
              )}
              <div className="flex justify-end mt-4"> {/* Align button to the right */}
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
