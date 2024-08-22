import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './loginComponents/LoginButton';
import SearchBar from '../_components/SearchBar';
import AddEventButton from './eventComponents/EventInsert';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          {/* <AddEventButton /> */}
          <SearchBar />
          <LoginButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="text-white focus:outline-none"
            aria-label="Toggle navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 bg-blue-900 bg-opacity-30 backdrop-blur-md p-4 absolute top-16 left-0 w-full z-10">
          <Link to="/events" className="text-white hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
            Events
          </Link>
          <Link to="/news" className="text-white hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
            News
          </Link>
          <SearchBar />
          <LoginButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
