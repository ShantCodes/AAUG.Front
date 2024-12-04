import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    HomeIcon,
    FireIcon,
    UserIcon,
    InformationCircleIcon,
    Cog6ToothIcon,
    NumberedListIcon,
    NewspaperIcon,
    DevicePhoneMobileIcon,
    PhoneIcon,
    ClipboardDocumentIcon
} from '@heroicons/react/24/outline';
import { getUserProfile } from '../services/userService/userSerice';
import { SocialIcon } from 'react-social-icons'

const MobileNavMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPhoneMenuOpen, setIsPhoneMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const toggleMenu = () => {
        if (!isMenuOpen) {
            setIsVisible(true); // Show the button before opening the menu
        } else {
            setTimeout(() => setIsVisible(false), 500); // Delay hiding after animation
        }
        setIsMenuOpen(!isMenuOpen);
    };

    const togglePhoneMenu = () => {
        setIsPhoneMenuOpen(!isPhoneMenuOpen);
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

        // Listen for the 'beforeinstallprompt' event to capture the install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault(); // Prevent the default install prompt
            setDeferredPrompt(e); // Store the event for later use
        });

        return () => {
            // Cleanup event listener
            window.removeEventListener('beforeinstallprompt', () => { });
        };
    }, []);

    const handleInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Show the install prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                setDeferredPrompt(null); // Reset the deferred prompt
            });
        }
    };

    const copyToClipboard = (number) => {
        navigator.clipboard.writeText(number);
    };

    const isAdmin =
        userInfo?.role?.toLowerCase() === 'king' ||
        userInfo?.role?.toLowerCase() === 'varich' ||
        userInfo?.role?.toLowerCase() === 'hanxnakhumb';

    const menuItems = [
        { to: '/', icon: <HomeIcon className="h-6 w-6" />, color: 'text-blue-500' },
        { to: '/News', icon: <NewspaperIcon className="h-6 w-6" />, color: 'text-purple-500' },
        { to: '/profile', icon: <UserIcon className="h-6 w-6" />, color: 'text-red-500' },
        { to: '/subscribe', icon: <FireIcon className="h-6 w-6" />, color: 'text-orange-500' },
        { to: '/aboutus', icon: <InformationCircleIcon className="h-6 w-6" />, color: 'text-yellow-500' },
        {
            to: '#',
            icon: <DevicePhoneMobileIcon className="h-6 w-6" />,
            color: 'text-green-500',
            onClick: handleInstall, // Handle the install prompt
        },
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
                    onClick={toggleMenu} // Add this line to close the menu on click
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
                className={`fixed bottom-6 right-6 z-40 flex items-center justify-center transition-all duration-300 ease-in-out ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
            >
                <div
                    className={`relative w-28 h-44 transition-transform duration-500 ease-out ${isMenuOpen ? '-rotate-45' : ''
                        }`}
                >
                    {menuItems.map((item, index) => {
                        const angle = (Math.PI / (menuItems.length - 1)) * index;
                        const x = Math.cos(angle) * 100;
                        const y = -Math.sin(angle) * 100;

                        return (
                            <div
                                key={item.to}
                                className={`absolute w-16 h-16 border border-gray-300 bg-white rounded-full shadow-2xl flex justify-center items-center transition-transform duration-500 ease-out`}
                                style={{
                                    transform: isMenuOpen
                                        ? `translate(${x}px, ${y}px) scale(1)`
                                        : 'translate(0, 0) scale(0)',
                                    transitionDelay: `${index * 0.1}s`, // Staggered delay based on index
                                }}
                            >
                                <Link to={item.to} className={`${item.color} hover:scale-110`} onClick={item.onClick}>
                                    {item.icon}
                                </Link>
                            </div>
                        );
                    })}

                </div>
            </div>

            {/* Telephone Button */}
            <div
                className={`fixed bottom-6 left-6 z-40 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                    }`}
            >
                <button
                    className=" text-green-600  p-4 rounded-full focus:outline-none "
                    onClick={togglePhoneMenu}
                >
                    <PhoneIcon className="h-10 w-10" />
                </button>
                {isPhoneMenuOpen && (
                    <div
                        className="fixed left-6 bottom-72 bg-white z-50 p-4 rounded-md shadow-lg border border-gray-200"
                        style={{ minWidth: '200px' }} // Optional: Adjust width if needed
                    >
                        <p className="flex justify-between items-center">
                            +98 21 888 44 300
                            <button
                                onClick={() => copyToClipboard('+98 21 888 44 300')}
                                className="text-blue-500 underline text-sm ml-2"
                            >
                                <ClipboardDocumentIcon className="w-5 h-5" />
                            </button>
                        </p>
                        <p className="flex justify-between items-center mt-2">
                            +98 21 888 20 899
                            <button
                                onClick={() => copyToClipboard('+98 21 888 20 899')}
                                className="text-blue-500 underline text-sm ml-2"
                            >
                                <ClipboardDocumentIcon className="w-5 h-5" />
                            </button>
                        </p>
                        <p className="flex justify-between items-center mt-2">
                            Info@aaug.ir
                            <button
                                onClick={() => copyToClipboard('Info@aaug.ir')}
                                className="text-blue-500 underline text-sm ml-2"
                            >
                                <ClipboardDocumentIcon className="w-5 h-5" />
                            </button>
                        </p>
                        {/* Instagram Button */}

                    </div>

                )}
                <div className="mt-4 flex justify-center">
                    <SocialIcon
                        url="mailto:Info@aaug.ir"
                        network="email"
                        fgColor="#ba03fc" // Icon color
                        bgColor="transparent" // Transparent background
                        style={{
                            height: 65, // Larger size
                            width: 65, // Larger size
                        }}
                    />
                </div>

                <div className="mt-4 flex justify-center">
                    <SocialIcon
                        url="https://www.instagram.com/aaug1943/"
                        network="instagram"
                        bgColor="transparent" // Background color to white
                        fgColor="#fc4103" // Icon color to orange
                        style={{
                            height: 65, // Larger size
                            width: 65, // Larger size
                        }}
                    />
                </div>
                <div className="mt-4 flex justify-center">
                    <SocialIcon
                        url="https://t.me/AAUG1943"
                        network="telegram"
                        bgColor="transparent" // Background color to white
                        fgColor="#0088CC" // Icon color to blue
                        style={{
                            height: 65, // Larger size
                            width: 65, // Larger size
                        }}
                    />
                </div>


            </div>
        </div>
    );
};

export default MobileNavMenu;
