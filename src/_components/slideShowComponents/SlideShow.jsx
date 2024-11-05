import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SlideShow.css";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { fetchSlidesWithTitle } from "../../services/slideShow/SlideShowService";
import { downloadFile } from "../../services/downloadFileService/downloadFileService";
import { fetchUserRole } from "../../services/userService/userSerice";
import defaultImage from '../../assets/error-image-generic.png'; // Ensure you import your default image

const SlideShow = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainTitle, setMainTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [imageCache, setImageCache] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const SLIDE_DURATION = 4000;
  const PROGRESS_INTERVAL = 100;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await fetchSlidesWithTitle();
        setSlides(data.slideShowGetViewModels);
        setMainTitle(data.description);

        if (data.slideShowGetViewModels.length === 0) {
          // No slides returned
          setImageCache([defaultImage]); // Set default image in cache
        } else {
          const imagePromises = data.slideShowGetViewModels.map((slide) => downloadFile(slide.mediaFileId));
          const cachedImages = await Promise.all(imagePromises);
          setImageCache(cachedImages);
        }
      } catch (error) {
        console.error("Error loading slides:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await fetchUserRole();
        setUserRole(role);
        console.log(role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchRole();
  }, []);

  useEffect(() => {
    if (!slides.length || !imageCache.length) return;

    const totalProgressSteps = SLIDE_DURATION / PROGRESS_INTERVAL;
    let progressCounter = 0;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      progressCounter = 0;
      setProgress(0);
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
    navigate("/SlideselectionPage");
  };

  if (loading) return <div>Loading slideshow...</div>; // Loading message until data is fetched

  if (!slides.length) {
    return (
      <div className="w-full max-w-lg mx-auto p-2 border border-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-lg font-bold text-center">{mainTitle || "No Slides Available"}</h2>
        <img src={defaultImage} alt="Default Slide" className="w-full h-48 object-cover" />
        {userRole === "King" || userRole === "Varich" ? (
          <button
            onClick={handleEdit}
            className="border border-yellow-500 text-yellow-500 rounded px-2 py-1 hover:bg-yellow-100 transition flex items-center mt-2"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
        ) : null}
      </div>
    );
  }

  const { description } = slides[currentIndex];
  const imageUrl = imageCache[currentIndex] || defaultImage; // Fallback to default image if necessary

  return (
    <div className="relative w-full max-w-lg mx-auto p-2 border border-gray-200 bg-white shadow-md rounded-lg overflow-hidden z-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold flex-grow text-center">{mainTitle}</h2>
        
        {/* Edit Button positioned in the top-right corner */}
        {userRole === "King" || userRole === "Varich" ? (
          <button
            onClick={handleEdit}
            className="absolute top-2 right-2 border border-yellow-500 text-yellow-500 rounded px-2 py-1 hover:bg-yellow-100 transition flex items-center"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
        ) : null}
      </div>
  
      <div className="relative w-full h-48 overflow-hidden rounded-lg">
        <img
          key={currentIndex}
          src={imageUrl}
          alt={description}
          className="slide-image object-cover w-full h-full transition-opacity duration-1000 ease-in-out opacity-0"
          onClick={() => handleImageClick(currentIndex)}
          style={{ opacity: 1 }}
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
              src={imageCache[modalIndex] || defaultImage}
              alt={slides[modalIndex]?.description || "Slide Image"}
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
