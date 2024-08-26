import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../_components/SearchBar';
import ProfilePicture from './userComponents/ProfilePicture';
import { getUserInfo } from '../services/authService/authService';
import LoginButton from './loginComponents/LoginButton';
import aaugLogo from '../assets/aaugLogo.jpg';

const Navbar = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'jwtToken') {
        loadUserInfo();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const isAdmin = userInfo?.role?.toLowerCase() === 'varich' || userInfo?.role?.toLowerCase() === 'king';

  return (
    <nav className="bg-white shadow-md px-4 py-3 fixed w-full top-0 z-10">
      <div className="container mx-auto flex items-center justify-between max-w-3xl"> {/* Centered search bar */}
        {/* Left section: Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center justify-center w-10 h-10">
            <img src={aaugLogo} alt="Logo" className="w-full h-full object-cover rounded-full" />
          </Link>
          <span className="text-xl font-bold text-gray-800">ՀՀԸՄ</span>
        </div>

        {/* Center section: Search Bar */}
        <div className="flex-1 px-4">
          <SearchBar className="w-full max-w-lg mx-auto" /> {/* Made the search bar wider */}
        </div>

        {/* Right section: Profile and Icons */}
        <div className="flex items-center space-x-3">
          {userInfo ? (
            <ProfilePicture profilePictureFileId={userInfo.profilePictureFileId} userInfo={userInfo} />
          ) : (
            <LoginButton />
          )}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 p-4 bg-blue-900 bg-opacity-90 backdrop-blur-md">
            <SearchBar className="w-full" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
