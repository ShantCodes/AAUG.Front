import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../_components/SearchBar';
import ProfilePicture from './userComponents/ProfilePicture';
import { getUserInfo } from '../services/authService/authService';
import LoginButton from './loginComponents/LoginButton';

const Navbar = () => {
  const [userInfo, setUserInfo] = useState(null);

  const loadUserInfo = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const userData = await getUserInfo(token);
        setUserInfo(userData);
      } catch (error) {
        console.error('Failed to fetch user info', error);
        setUserInfo(null); // Handle cases where user data can't be fetched
      }
    } else {
      setUserInfo(null);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []); // Empty dependency array to run only on mount

  // Effect to handle token change
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
          <h1 className="text-white text-4xl">
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

        <div className="hidden md:flex items-center space-x-3">
          <SearchBar />
          {userInfo ? (
            <ProfilePicture profilePictureFileId={userInfo.profilePictureFileId} userInfo={userInfo} />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
