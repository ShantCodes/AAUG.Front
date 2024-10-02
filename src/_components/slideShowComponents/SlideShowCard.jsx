import React from "react";
import SlideShowImage from "./SlideShowImage";

const SlideShowCard = ({ slide }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <SlideShowImage fileId={slide.mediaFileId} description={slide.description} />
            <p className="mt-4 text-gray-700 text-sm">{slide.description}</p>
        </div>
    );
};

export default SlideShowCard;
