import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Implement the search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full">
      <input
        type="text"
        className={`w-full h-10 pl-10 pr-4 rounded-full bg-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ${
          window.innerWidth < 768 ? 'text-base' : ''
        }`}
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.9 14.32a7.5 7.5 0 111.42-1.42l4.35 4.36a1 1 0 01-1.42 1.42l-4.36-4.35zM7.5 13a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;