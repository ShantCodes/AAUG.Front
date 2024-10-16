import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SearchContext } from '../untils/SearchContext'; // Ensure the path is correct

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { setSearchResults } = useContext(SearchContext); // Get setSearchResults from context

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    console.log("Search icon clicked.");
    if (searchTerm) {
      try {
        const url = `http://localhost:37523/api/Events/SearchEvent/${encodeURIComponent(searchTerm)}`;
        console.log(`Fetching from: ${url}`);
        const response = await axios.get(url);
        console.log('API Response:', response.data);
        setSearchResults(response.data); // Update the search results in context
      } catch (error) {
        console.error('Failed to search the event:', error);
      }
    } else {
      console.warn('Search term is empty.');
      setSearchResults(null); // Send null result to the provider when search term is empty
    }
  };

  return (
    <div className="flex w-full space-x-2">
      <div className="relative flex-grow transition-all duration-300">
        <input
          type="text"
          className={`w-full h-10 pl-10 pr-10 rounded-full bg-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (searchTerm === '') {
              setIsFocused(false); // Only blur if the search term is empty
              setSearchResults(null); // Send null result when losing focus and term is empty
            }
          }}
        />
        {/* Only show the icon inside the input field when not focused */}
        {!isFocused && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer transition-all duration-300">
            <MagnifyingGlassIcon className={`w-5 h-5 text-gray-500`} />
          </div>
        )}
      </div>
      {/* Search button appears when focused */}
      {isFocused && (
        <button
          className="flex items-center h-10 px-4 rounded-full bg-blue-500 text-white transition duration-200"
          onClick={handleSearchClick}
        >
          <MagnifyingGlassIcon className={`w-5 h-5`} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
