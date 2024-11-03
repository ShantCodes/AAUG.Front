import React, { useState } from "react";
import { insertNews } from "../../services/newsService/NewsService";

const AddNews = () => {
    const [newsTitle, setNewsTitle] = useState("");
    const [newsDetails, setNewsDetails] = useState("");
    const [newsFile, setNewsFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setNewsFile(file);

        // Generate a preview of the image
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null); // Reset if no file is selected
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            await insertNews({ NewsTitle: newsTitle, NewsDetails: newsDetails, NewsFile: newsFile });
            setSuccessMessage("News added successfully!");
            setNewsTitle("");
            setNewsDetails("");
            setNewsFile(null);
            setPreviewImage(null); // Reset preview after submission
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative w-full">
            {/* Banner Image Input Section */}
            <div
                className="relative w-full h-64 lg:h-96 bg-gray-400 flex items-center justify-center cursor-pointer"
                style={{
                    backgroundImage: previewImage ? `url(${previewImage})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                onClick={() => document.getElementById("newsFileInput").click()}
            >
                {!previewImage && (
                    <span className="text-white text-2xl font-bold">Click to upload an image</span>
                )}
                <input
                    type="file"
                    id="newsFileInput"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            {/* News Form Section */}
            <div className="relative max-w-4xl mx-auto p-4 bg-gray-100 shadow-md rounded-lg mt-4 z-10">
                {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                {successMessage && <p className="text-green-600">{successMessage}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold">News Title</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={newsTitle}
                            onChange={(e) => setNewsTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">News Details</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            rows="5"
                            value={newsDetails}
                            onChange={(e) => setNewsDetails(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Add News"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNews;
