import React, { useState, useContext, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SearchContext } from '../untils/SearchContext';
import { searchEvents } from '../services/searchService/SearchService';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setSearchResults } = useContext(SearchContext);
  const iconRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isFocused) {
      setIsTransitioning(true);
      timer = setTimeout(() => setShowButton(true), 500);
    } else {
      setShowButton(false);
      setTimeout(() => setIsTransitioning(false), 300);
    }
    return () => clearTimeout(timer);
  }, [isFocused]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    if (searchTerm) {
      setIsAnimating(true);
      setTimeout(async () => {
        try {
          const results = await searchEvents(searchTerm);
          setSearchResults(results);
        } catch (error) {
          console.error('Failed to search the event:', error);
        } finally {
          setIsAnimating(false);
        }
      }, 300);
    } else {
      setSearchResults(null);
    }
  };

  return (
    <div className="flex w-full space-x-2 relative">
      <div className={`relative transition-all duration-700 ease-in-out ${isFocused ? 'w-[90%]' : 'w-full'}`}>
        <input
          type="text"
          className="w-full h-10 pl-10 pr-10 rounded-full bg-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-700"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (searchTerm === '') {
              setIsFocused(false);
              setSearchResults(null);
            }
          }}
        />
        <div
          ref={iconRef}
          className={`absolute top-1/2 transform -translate-y-1/2 cursor-pointer transition-all duration-700 
          ${isFocused || isTransitioning ? 'left-[90%] scale-150 opacity-0' : 'left-3 scale-100 opacity-100'}
          ${showButton ? 'hidden' : ''}`}
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-700 stroke-current stroke-2" />
        </div>
      </div>
      <button
        className={`flex items-center h-10 rounded-full bg-blue-500 text-white transition-all duration-500 ease-in-out
        ${showButton ? 'w-auto px-4 translate-x-0 scale-100 pointer-events-auto' : 'w-0 px-0 -translate-x-full scale-0 pointer-events-none'}
        ${isAnimating ? 'translate-x-5' : ''}`}
        onClick={handleSearchClick}
      >
        <MagnifyingGlassIcon className="w-5 h-5 stroke-current stroke-2" />
      </button>
    </div>
  );
};

export default SearchBar;
