import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNewsTeaser, deleteNews } from "../../services/newsService/NewsService";
import { downloadFile } from "../../services/downloadFileService/downloadFileService";
import { TrashIcon } from '@heroicons/react/24/outline';
import { fetchUserRole } from "../../services/userService/userSerice"; // Make sure this path is correct

const NewsBox = () => {
    const [news, setNews] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewsAndRole = async () => {
            try {
                const [newsData, role] = await Promise.all([getNewsTeaser(), fetchUserRole()]);
                setNews(newsData);
                setUserRole(role);
            } catch (error) {
                console.error("Error fetching news or role:", error);
            }
        };
        fetchNewsAndRole();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/news/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await deleteNews(id);
            setNews(news.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting news:", error);
        }
    };

    const hasDeletePermission = ["Varich", "King"].includes(userRole);

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
                    <div
                        className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-50"
                        style={{
                            backgroundImage: `url(${downloadFile(item.newsFileId)})`,
                            zIndex: -2
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

                    <div className="flex items-center justify-between relative z-10">
                        <h3 className="text-lg font-bold truncate text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                            {item.newsTitle}
                        </h3>
                        {hasDeletePermission && (
                            <button
                                className="ml-2 p-1 rounded bg-red-100 hover:bg-red-300 transition"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(item.id);
                                }}
                            >
                                <TrashIcon className="h-4 text-red-500" />
                            </button>
                        )}
                    </div>

                    {hoveredIndex === index && (
                        <p
                            className="text-sm mt-2 relative z-10 text-white"
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
