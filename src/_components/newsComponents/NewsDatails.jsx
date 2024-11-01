import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsById } from "../../services/newsService/NewsService";
import { downloadFile } from "../../services/downloadFileService/downloadFileService";

const NewsDetails = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        const fetchNewsItem = async () => {
            try {
                const data = await getNewsById(id);
                setNewsItem(data);
            } catch (error) {
                console.error("Error fetching news item:", error);
            }
        };

        fetchNewsItem();
    }, [id]);

    if (!newsItem) return <p className="text-center">Loading...</p>;

    return (
        <div className="relative w-full">
            {newsItem.newsFileId && (
                <>
                    {/* Blurred Background Image */}
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-gray-400 bg-center filter blur-3xl"
                        style={{
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>

                    {/* Main Image */}
                    <div className="relative w-full h-64 lg:h-96 group transition-all duration-500 ease-in-out hover:h-screen overflow-hidden">
                        <img
                            src={downloadFile(newsItem.newsFileId)}
                            alt={newsItem.newsTitle}
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-500"></div>
                        <h1 className="absolute inset-0 flex items-center justify-center text-3xl lg:text-5xl font-bold text-white text-center px-4 transition-opacity duration-500 group-hover:opacity-0">
                            {newsItem.newsTitle}
                        </h1>
                    </div>
                </>
            )}

            {/* News Details Section */}
            <div className="relative max-w-4xl mx-auto p-4 bg-gray-100 opacity-60 shadow-md rounded-b-lg z-10">
                <p className="text-gray-700 text-lg leading-relaxed">
                    {newsItem.newsDetails}
                </p>
            </div>
        </div>
    );
};

export default NewsDetails;
