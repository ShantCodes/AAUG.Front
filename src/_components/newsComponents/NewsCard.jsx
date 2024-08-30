import React from "react";
import NewsBox from "./NewsBox";
import { BookOpenIcon } from '@heroicons/react/24/outline';

const NewsCard = () => {
    return (
        <div className="p-4 bg-gray-100 max-w-sm mx-auto rounded-lg">
            <h1 className="text-2xl font-bold text-left text-gray-900 mb-6 flex items-center">
                News
                <BookOpenIcon className="w-6 h-6 ml-2 text-red-600" />
            </h1>
            <div>
                <NewsBox />
            </div>
        </div>
    );
};

export default NewsCard;
