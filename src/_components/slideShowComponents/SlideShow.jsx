import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Update import
import "./SlideShow.css"; // Import the CSS for animations
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const SlideShow = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainTitle, setMainTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [imageCache, setImageCache] = useState([]); // Store the downloaded images
  const [userRole, setUserRole] = useState(""); // New state to hold user role

  const SLIDE_DURATION = 4000; // 4 seconds for each slide
  const PROGRESS_INTERVAL = 100; // Progress update interval

  const navigate = useNavigate(); // Initialize navigate

  // Fetch slide data and pre-fetch images
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get("http://localhost:37523/api/SlideShow/GetSlideShowWithTitle");
        const slideData = response.data.slideShowGetViewModels;
        setSlides(slideData);
        setMainTitle(response.data.description);

        // Pre-fetch and cache the images
        const imagePromises = slideData.map(async (slide) => {
          const imageResponse = await axios.get(`http://localhost:37523/api/Media/DownloadFile/${slide.mediaFileId}`, {
            responseType: "blob",
          });
          const imageUrl = URL.createObjectURL(imageResponse.data); // Convert Blob to URL
          return imageUrl;
        });

        // Wait for all images to be downloaded and set them in the cache
        const cachedImages = await Promise.all(imagePromises);
        setImageCache(cachedImages);
      } catch (error) {
        console.error("Error fetching slideshow data", error);
      }
    };

    fetchSlides();
  }, []);

  // Fetch user info to check role
  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("jwtToken"); // Get the token from local storage
      if (token) {
        try {
          const response = await axios.get("http://localhost:37523/api/AaugUser/GetCurrentUserInfo", {
            headers: { Authorization: `Bearer ${token}` }, // Include the token in the headers
          });
          setUserRole(response.data.role); // Set the user role
        } catch (error) {
          console.error("Error fetching user role", error);
        }
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    if (slides.length === 0 || imageCache.length === 0) return; // Prevent running if there are no slides or images

    const totalProgressSteps = SLIDE_DURATION / PROGRESS_INTERVAL;
    let progressCounter = 0;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      progressCounter = 0; // Reset progress counter on slide change
      setProgress(0); // Reset progress
    }, SLIDE_DURATION);

    const progressInterval = setInterval(() => {
      if (progressCounter < totalProgressSteps) {
        progressCounter++;
        setProgress((prevProgress) => Math.min(prevProgress + (100 / totalProgressSteps), 100));
      }
    }, PROGRESS_INTERVAL);

    return () => {
      clearInterval(slideInterval);
      clearInterval(progressInterval);
    };
  }, [slides, imageCache]);

  const handleImageClick = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const prevSlide = () => {
    setModalIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setModalIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const handleEdit = () => {
    navigate("/SlideselectionPage"); // Navigate to edit page
  };

  if (slides.length === 0 || imageCache.length === 0) return <div>Loading slideshow...</div>;

  const { description } = slides[currentIndex];
  const imageUrl = imageCache[currentIndex]; // Use the cached image URL

  return (
    <div className="w-full max-w-lg mx-auto p-2 border border-gray-100 bg-white shadow-lg rounded-lg overflow-hidden z-50">
      <div className="flex justify-between items-center mb-2">
        <div className="title-container"> {/* Center the title here */}
          <h2 className="text-lg font-bold">{mainTitle}</h2>
        </div>
        {userRole === "King" || userRole === "Varich" ? (
          <button
            onClick={handleEdit}
            className="border border-yellow-500 text-yellow-500 rounded px-2 py-1 hover:bg-yellow-100 transition flex items-center"
          >
            <PencilSquareIcon className="h-5 w-5 " />
          </button>
        ) : null}
      </div>

      <div className="relative w-full h-48 overflow-hidden rounded-lg">
        <img
          key={currentIndex}
          src={imageUrl}
          alt={description}
          className="slide-image object-cover w-full h-full transition-transform duration-1000 ease-in-out cursor-pointer"
          onClick={() => handleImageClick(currentIndex)}
        />
      </div>
      <p className="mt-2 text-center text-gray-700 text-sm">{description}</p>
      <div className="relative w-full h-2 mt-2 bg-gray-200 rounded">
        <div
          className="absolute top-0 left-0 h-full bg-gray-100 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      {isModalOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[999]" onClick={closeModal}>
          <div className="modal-content relative flex items-center justify-center">
            <span className="close-modal absolute top-0 right-0 text-white text-3xl cursor-pointer" onClick={closeModal}>
              &times;
            </span>
            <button
              className="modal-arrow absolute left-4 text-white text-3xl cursor-pointer z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
            >
              &#10094;
            </button>
            <img
              src={imageCache[modalIndex]} // Use cached image URL for the modal
              alt={slides[modalIndex].description}
              className="max-w-full max-h-screen"
            />
            <button
              className="modal-arrow absolute right-4 text-white text-3xl cursor-pointer z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideShow;
