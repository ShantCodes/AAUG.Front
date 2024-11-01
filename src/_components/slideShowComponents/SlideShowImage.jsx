import React from "react";
import { downloadFile } from '../../services/downloadFileService/downloadFileService'

const SlideShowImage = ({ fileId, description }) => {
    const imageUrl = `${downloadFile(fileId)}`;

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
