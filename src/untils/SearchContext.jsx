import React, { createContext, useState } from 'react';

// Create a context for search data
export const SearchContext = createContext();

// Provider component to wrap your app or part of your app
export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};
