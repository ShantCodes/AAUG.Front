import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../_components/SearchBar';
import ProfilePicture from './userComponents/ProfilePicture';
import { getUserInfo } from '../services/authService/authService';
import LoginButton from './loginComponents/LoginButton';

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

  return (
    <nav className="bg-blue-900 bg-opacity-30 backdrop-blur-md p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center max-w-4xl">
        <div className="flex items-center space-x-3">
          <h1 className="text-white text-3xl md:text-4xl">
            ՀՀԸՄ
          </h1>
          <div className="hidden md:flex space-x-3">
            <Link to="/events" className="text-white hover:text-gray-300">
              Events
            </Link>
            <Link to="/news" className="text-white hover:text-gray-300">
              News
            </Link>
            <Link to="/Present" className="text-white hover:text-gray-300">
              Present
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex">
            <SearchBar />
          </div>
          {userInfo ? (
            <ProfilePicture profilePictureFileId={userInfo.profilePictureFileId} userInfo={userInfo} />
          ) : (
            <LoginButton />
          )}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
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
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 p-4 bg-blue-900 bg-opacity-90 backdrop-blur-md">
            <Link to="/events" className="text-white hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
              Events
            </Link>
            <Link to="/news" className="text-white hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
              News
            </Link>
            <Link to="/Present" className="text-white hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
              Present
            </Link>
            <SearchBar />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
