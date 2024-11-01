// SlideShowTitleInput.js
import React, { useState } from "react";
import { saveSlideShowTitle } from "../../services/slideShow/SlideShowService";

const SlideShowTitleInput = () => {
    const [title, setTitle] = useState("");

    const handleInputChange = (event) => {
        console.log("Input changed:", event.target.value);
        setTitle(event.target.value);
    };

    const handleSave = async () => {
        if (!title) {
            console.error("Title is required");
            return;
        }

        try {
            const response = await saveSlideShowTitle(title); // Call the service function
            console.log("SlideShow title saved:", response);
            setTitle(""); // Reset the input field after saving
        } catch (error) {
            console.error("Error saving SlideShow title:", error.message);
        }
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={title}
                onChange={handleInputChange}
                placeholder="Change main title"
                className="border p-2 rounded-l"
            />
            <button
                onClick={handleSave}
                className="bg-blue-500 text-white p-2 rounded-r"
            >
                Save
            </button>
        </div>
    );
};

export default SlideShowTitleInput;
