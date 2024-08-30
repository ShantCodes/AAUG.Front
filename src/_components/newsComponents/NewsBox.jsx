import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsBox = () => {
    const [news, setNews] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:37523/api/News/GetNewsData")
            .then(response => setNews(response.data))
            .catch(error => console.error("Error fetching news:", error));
    }, []);

    return (
        <div className="flex flex-col items-center gap-4">
            {news.map((item, index) => (
                <div
                    key={item.id}
                    className={`bg-gray-300 shadow-lg rounded-lg p-4 transition-transform duration-300 ease-in-out transform ${
                        hoveredIndex === index ? 'scale-105' : ''
                    } w-64`}
                    onMouseEnter={() => {
                        console.log(`Mouse entered item ${item.id}`);
                        setHoveredIndex(index);
                    }}
                    onMouseLeave={() => {
                        console.log(`Mouse left item ${item.id}`);
                        setHoveredIndex(null);
                    }}
                >
                    <h3 className="text-lg font-bold text-gray-800 truncate">
                        {item.newsTitle}
                    </h3>
                    {hoveredIndex === index && (
                        <p className="text-sm text-gray-600 mt-2">
                            {item.newsDetails.substring(0, 50)}...
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NewsBox;
