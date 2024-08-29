import React from "react";
import NewsBox from "./NewsBox";

const NewsCard = () => {
    return (
        <div className="p-4 bg-gray-100 max-w-sm mx-auto rounded-lg ">
            <h1 className="text-2xl font-bold text-left text-gray-900 mb-6">
                News
            </h1>
            <div>
                <NewsBox />
            </div>
        </div>
    );
};

export default NewsCard;
