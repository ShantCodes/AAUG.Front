import React, { useEffect, useState } from "react";
import { downloadFile } from '../../services/downloadFileService/downloadFileService';
import defaultImage from '../../assets/error-image-generic.png';

const SlideShowImage = ({ fileId, description }) => {
    const [imageUrl, setImageUrl] = useState(defaultImage);

    useEffect(() => {
        const fetchImage = async () => {
            if (fileId) {
                try {
                    const downloadedImage = await downloadFile(fileId);
                    setImageUrl(downloadedImage);
                } catch (error) {
                    console.error("Error downloading image:", error);
                }
            }
        };
        fetchImage();
    }, [fileId]);

    return (
        <div className="w-full h-64 overflow-hidden rounded-lg">
            <img
                src={imageUrl}
                alt={description || "Slide Image"}
                className="object-cover w-full h-full"
            />
        </div>
    );
};

export default SlideShowImage;
