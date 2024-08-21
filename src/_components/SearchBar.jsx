import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (location.pathname === '/events') {
            console.log('Searching events:', searchTerm);
        } else if (location.pathname === '/news') {
            console.log('Searching news:', searchTerm);
        }
    };

    return (
        <form onSubmit={handleSearchSubmit} className="flex space-x-2">
            <input
                type="text"
                className="px-2 py-1 rounded-md border border-gray-700 focus:border-gray-500 focus:ring focus:ring-gray-500"
                placeholder={`Search ${location.pathname === '/news' ? 'News' : 'Events'}`}
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button
                type="submit"
                className="bg-gray-700 text-white px-3 py-1 rounded-md hover:bg-gray-600">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
