import React, { useEffect, useState } from "react";
import NewsBox from "./NewsBox";
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import axios from 'axios'; // Import axios for making API calls
import { PencilSquareIcon } from '@heroicons/react/24/outline';


const NewsCard = () => {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate(); // Create a navigate function for navigation

    useEffect(() => {
        const token = localStorage.getItem("jwtToken"); // Check for the token

        if (token) {
            axios.get('http://localhost:37523/api/AaugUser/GetCurrentUserInfo', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in headers
                },
            })
                .then((response) => {
                    const role = response.data.role; // Get the user's role from the response
                    setUserRole(role); // Set the user role in state
                })
                .catch((error) => {
                    console.error("Error fetching user info:", error); // Handle errors
                });
        }
    }, []); // Empty dependency array to run once on mount

    const handleNavigate = () => {
        navigate('/NewsDashboardPage'); // Navigate to the NewsDashboardPage
    };

    return (
        <div className="p-4 max-w-sm mx-auto rounded-lg">
            <h1 className="text-2xl font-bold text-left text-gray-900 mb-6 flex items-center">
                News
                <BookOpenIcon className="w-6 h-6 ml-2 text-red-600" />
                {(userRole === "King" || userRole === "Varich") && (
                    <button
                        onClick={handleNavigate}
                        className="border border-yellow-500 text-yellow-500 px-2 py-1 text-sm rounded hover:bg-yellow-100 transition flex items-center ml-2">
                        <PencilSquareIcon className="h-5 w-5" />
                    </button>
                )}
            </h1>
            <div>
                <NewsBox />
            </div>
        </div>

    );
};

export default NewsCard;
