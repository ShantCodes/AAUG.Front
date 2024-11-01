import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNewsTeaser } from "../../services/newsService/NewsService";
import { downloadFile } from "../../services/downloadFileService/downloadFileService";

const NewsBox = () => {
    const [news, setNews] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsData = await getNewsTeaser();
                setNews(newsData);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/news/${id}`);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {news.map((item, index) => (
                <div
                    key={item.id}
                    className={`relative bg-gray-200 shadow-lg rounded-lg p-4 transition-transform duration-300 ease-in-out transform ${hoveredIndex === index ? 'scale-105' : ''} w-64 cursor-pointer overflow-hidden`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleCardClick(item.id)}
                >
                    {/* Blurred background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-50"
                        style={{
                            backgroundImage: `url(${downloadFile(item.newsFileId)})`,
                            zIndex: -2
                        }}
                    ></div>

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

                    {/* News Title with Text Outline */}
                    <h3 className="text-lg font-bold truncate relative z-10 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                        {item.newsTitle}
                    </h3>

                    {hoveredIndex === index && (
                        <p
                            className={`text-sm mt-2 relative z-10 text-white ${hoveredIndex !== null ? 'animate-text' : ''}`}
                            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
                        >
                            {item.newsDetails.substring(0, 50)}...
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NewsBox;
