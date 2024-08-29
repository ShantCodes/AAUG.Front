import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, AcademicCapIcon, NewspaperIcon, PresentationChartLineIcon, UserIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { getUserInfo } from '../services/authService/authService'; // Update path as needed

const NavMenu = () => {
    const [userInfo, setUserInfo] = useState(null);
    const location = useLocation(); // Get current location

    // Fetch user information from local storage token
    const loadUserInfo = async () => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const userData = await getUserInfo(token);
                setUserInfo(userData);
            } catch (error) {
                console.error('Failed to fetch user info', error);
                setUserInfo(null);
            }
        } else {
            setUserInfo(null);
        }
    };

    useEffect(() => {
        loadUserInfo();
    }, []);

    // Determine if the user has an admin role
    const isAdmin = userInfo?.role?.toLowerCase() === 'king' || userInfo?.role?.toLowerCase() === 'varich';

    // Function to check if the path matches the current location
    const isActive = (path) => location.pathname === path ? 'text-blue-600 bg-gray-200' : '';

    return (
        <div className="w-48 mx-auto justify-end"> {/* Reduced width and centered using mx-auto */}
            <ul className="space-y-4 mt-24">
                <li>
                    <Link to="/" className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-300 ${isActive('/')}`}>
                        <HomeIcon className="h-6 w-6 text-blue-500 transition-colors duration-300" />
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/events" className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-300 ${isActive('/events')}`}>
                        <AcademicCapIcon className="h-6 w-6 text-green-500 transition-colors duration-300" />
                        <span>Events</span>
                    </Link>
                </li>
                <li>
                    <Link to="/news" className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-300 ${isActive('/news')}`}>
                        <NewspaperIcon className="h-6 w-6 text-purple-500 transition-colors duration-300" />
                        <span>News</span>
                    </Link>
                </li>
                <li>
                    <Link to="/present" className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-300 ${isActive('/present')}`}>
                        <PresentationChartLineIcon className="h-6 w-6 text-yellow-500 transition-colors duration-300" />
                        <span>Present</span>
                    </Link>
                </li>
                <li>
                    <Link to="/AboutUs" className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-300 ${isActive('/aboutus')}`}>
                        <InformationCircleIcon className="h-6 w-6 text-yellow-500 transition-colors duration-300" />
                        <span>About Us</span>
                    </Link>
                </li>
                {isAdmin && (
                    <li>
                        <Link to="/admin" className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-300 ${isActive('/admin')}`}>
                            <UserIcon className="h-6 w-6 text-red-500 transition-colors duration-300" />
                            <span>Admin</span>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default NavMenu;
