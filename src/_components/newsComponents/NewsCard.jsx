import React, { useEffect, useState } from "react";
import NewsBox from "./NewsBox";
import { BookOpenIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from "../../services/userService/userSerice";

const NewsCard = () => {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const userInfo = await getUserProfile();
                setUserRole(userInfo.role);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserRole();
    }, []);

    const handleNavigate = () => {
        navigate('/NewsDashboardPage');
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
