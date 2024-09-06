import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, FireIcon ,AcademicCapIcon, NewspaperIcon, Cog6ToothIcon, UserIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { getUserInfo } from '../services/authService/authService';

const NavMenu = ({ isNavMenuOpen, toggleNavMenu }) => {
    const [userInfo, setUserInfo] = useState(null);
    const location = useLocation();

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

    const isAdmin = userInfo?.role?.toLowerCase() === 'king' || userInfo?.role?.toLowerCase() === 'varich' || userInfo?.role?.toLowerCase() === 'hanxnakhumb';

    const isActive = (path) => (location.pathname === path ? 'text-blue-600 bg-gray-200' : '');

    return (
        <ul className={` w-full space-y-4 p-4 ${isNavMenuOpen ? 'block' : 'hidden'} md:block`}>
            <li>
                <Link
                    to="/"
                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-300 ${isActive(
                        '/'
                    )}`}
                    onClick={toggleNavMenu}
                >
                    <HomeIcon className="h-6 w-6 text-blue-500 transition-colors duration-300" />
                    <span>Home</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/events"
                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-300 ${isActive(
                        '/events'
                    )}`}
                    onClick={toggleNavMenu}
                >
                    <AcademicCapIcon className="h-6 w-6 text-green-500 transition-colors duration-300" />
                    <span>Events</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/news"
                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-300 ${isActive(
                        '/news'
                    )}`}
                    onClick={toggleNavMenu}
                >
                    <NewspaperIcon className="h-6 w-6 text-purple-500 transition-colors duration-300" />
                    <span>News</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/Profile"
                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-300 ${isActive(
                        '/Profile'
                    )}`}
                    onClick={toggleNavMenu}
                >
                    <UserIcon className="h-6 w-6 text-red-500 transition-colors duration-300" />
                    <span>Profile</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/Subscribe"
                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-300 ${isActive(
                        '/Subscribe'
                    )}`}
                    onClick={toggleNavMenu}
                >
                    <FireIcon className="h-6 w-6 text-red-500 transition-colors duration-300" />
                    <span>Subscribe</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/aboutus"
                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-300 ${isActive(
                        '/aboutus'
                    )}`}
                    onClick={toggleNavMenu}
                >
                    <InformationCircleIcon className="h-6 w-6 text-yellow-500 transition-colors duration-300" />
                    <span>About Us</span>
                </Link>
            </li>
            {isAdmin && (
                <li>
                    <Link
                        to="/admin"
                        className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-300 ${isActive(
                            '/admin'
                        )}`}
                        onClick={toggleNavMenu}
                    >
                        <Cog6ToothIcon className="h-6 w-6 text-red-500 transition-colors duration-300" />
                        <span>Admin</span>
                    </Link>
                </li>
            )}
        </ul>
    );
};

export default NavMenu;
