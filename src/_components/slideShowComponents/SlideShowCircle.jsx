import React, { useEffect, useState } from "react";
import { fetchSlidesWithTitle } from "../../services/slideShow/SlideShowService";
import { downloadFile } from "../../services/downloadFileService/downloadFileService";
import { fetchUserRole } from "../../services/userService/userSerice";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/error-image-generic.png";
import { FolderPlusIcon } from "@heroicons/react/24/outline";

const SlideShowCircle = () => {
    const [slides, setSlides] = useState([]);
    const [imageCache, setImageCache] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const [showGreenCircle, setShowGreenCircle] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSlidesAndRole = async () => {
            try {
                // Fetch slides
                const data = await fetchSlidesWithTitle();
                setSlides(data.slideShowGetViewModels || []);
                const imagePromises = data.slideShowGetViewModels?.map((slide) =>
                    downloadFile(slide.mediaFileId)
                );
                const cachedImages = imagePromises ? await Promise.all(imagePromises) : [];
                setImageCache(cachedImages);

                // Fetch user role
                const role = await fetchUserRole();
                if (role === "King" || role === "Varich") {
                    setShowGreenCircle(true);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchSlidesAndRole();
    }, []);

    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalImage("");
        setIsModalOpen(false);
    };

    const handleGreenCircleClick = () => {
        navigate("/slideSelectionPage"); // Navigate to SlideSelectionPage
    };

    if (!slides.length) return null; // If no slides, don't render the component

    return (
        <div className="flex flex-col">
            {/* Image Circle List */}
            <div className="flex justify-start space-x-4 overflow-x-auto scrollbar-hide lg:hidden">
                {showGreenCircle && (
                    <div
                        className="flex-shrink-0 w-24 h-24 rounded-full border-2 p-1 border-green-600 bg-green-100 overflow-hidden cursor-pointer"
                        onClick={handleGreenCircleClick}
                    >
                        <div className="w-full h-full flex items-center justify-center text-green-800 text-4xl font-bold">
                            <FolderPlusIcon className="w-10 h-10"/>
                        </div>
                    </div>
                )}
                {imageCache.map((imageUrl, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-24 h-24 rounded-full border-2 p-1 border-orange-600 overflow-hidden cursor-pointer"
                        onClick={() => handleImageClick(imageUrl || defaultImage)}
                    >
                        <img
                            src={imageUrl || defaultImage}
                            alt={`Slide ${index + 1}`}
                            className="object-cover w-full h-full rounded-full"
                        />
                    </div>
                ))}
            </div>

            {/* Modal for Expanded Image */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative max-w-screen-sm max-h-screen"
                        onClick={(e) => e.stopPropagation()} // Prevent modal close on image click
                    >
                        <button
                            className="absolute top-2 right-2 text-white text-3xl"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <img
                            src={modalImage}
                            alt="Expanded Slide"
                            className="object-contain w-full h-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SlideShowCircle;
