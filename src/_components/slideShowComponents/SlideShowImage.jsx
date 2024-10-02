import React from "react";

const SlideShowImage = ({ fileId, description }) => {
    const imageUrl = `http://localhost:37523/api/Media/DownloadFile/${fileId}`;

    return (
        <div className="w-full h-64 overflow-hidden rounded-lg">
            <img 
                src={imageUrl} 
                alt={description} 
                className="object-cover w-full h-full" 
            />
        </div>
    );
};

export default SlideShowImage;
