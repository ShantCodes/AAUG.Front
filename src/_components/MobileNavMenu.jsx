import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    HomeIcon,
    FireIcon,
    UserIcon,
    InformationCircleIcon,
    Cog6ToothIcon,
    NumberedListIcon,
} from '@heroicons/react/24/outline';
import { getUserProfile } from '../services/userService/userSerice';

const MobileNavMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const loadUserInfo = async () => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                try {
                    const userData = await getUserProfile(token);
                    setUserInfo(userData);
                } catch (error) {
                    console.error('Failed to fetch user info', error);
                    setUserInfo(null);
                }
            } else {
                setUserInfo(null);
            }
        };

        loadUserInfo();
    }, []);

    const isAdmin =
        userInfo?.role?.toLowerCase() === 'king' ||
        userInfo?.role?.toLowerCase() === 'varich' ||
        userInfo?.role?.toLowerCase() === 'hanxnakhumb';

    const menuItems = [
        { to: '/', icon: <HomeIcon className="h-6 w-6" />, color: 'text-blue-500' },
        { to: '/profile', icon: <UserIcon className="h-6 w-6" />, color: 'text-red-500' },
        { to: '/subscribe', icon: <FireIcon className="h-6 w-6" />, color: 'text-orange-500' },
        { to: '/aboutus', icon: <InformationCircleIcon className="h-6 w-6" />, color: 'text-yellow-500' },
    ];

    if (isAdmin) {
        menuItems.push({
            to: '/admin',
            icon: <Cog6ToothIcon className="h-6 w-6" />,
            color: 'text-green-500',
        });
    }

    return (
        <div className="relative">
            {/* Backdrop Blur Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 opacity-100 backdrop-blur-sm z-30 transition-backdrop-blur duration-1000 ease-in-out"
                ></div>
            )}

            {/* Floating Button */}
            <button
                onClick={toggleMenu}
                className="fixed bottom-6 right-6 z-50 bg-blue-500 text-white p-4 rounded-full shadow-lg focus:outline-none transition-transform transform hover:scale-100"
            >
                <NumberedListIcon className="h-8 w-8 text-white" />
            </button>

            {/* Animated Menu Items */}
            <div
                className={`fixed bottom-6 right-6 z-40 flex items-center justify-center transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
            >
                {/* Menu Container */}
                <div
                    className={`relative w-28 h-44 transition-transform duration-500 ease-out ${
                        isMenuOpen ? '-rotate-45' : ''
                    }`}
                >
                    {menuItems.map((item, index) => {
                        const angle = (Math.PI / (menuItems.length - 1)) * index; // Calculate the angle for each item
                        const x = Math.cos(angle) * 100; // X-coordinate based on angle
                        const y = -Math.sin(angle) * 100; // Y-coordinate (negative for upward direction)

                        return (
                            <div
                                key={item.to}
                                className={`absolute w-16 h-16 border border-gray-200 bg-white rounded-full shadow-lg flex justify-center items-center transition-transform duration-500 ease-out delay-${
                                    100 + index * 50
                                } ${
                                    isMenuOpen
                                        ? `translate-x-[${x}px] translate-y-[${y}px] scale-100`
                                        : 'translate-x-0 translate-y-0 scale-0'
                                }`}
                                style={{
                                    transform: isMenuOpen
                                        ? `translate(${x}px, ${y}px) scale(1)`
                                        : 'translate(0, 0) scale(0)',
                                }}
                            >
                                <Link to={item.to} className={`${item.color} hover:scale-110`}>
                                    {item.icon}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MobileNavMenu;
