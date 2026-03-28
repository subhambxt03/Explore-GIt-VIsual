import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch, recentSearches, favorites, loading }) => {
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
      setShowDropdown(false);
    }
  };

  const handleQuickSearch = (name) => {
    setUsername(name);
    onSearch(name);
    setShowDropdown(false);
  };

  return (
    <div className="mb-6 sm:mb-8" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              placeholder="Enter GitHub username (e.g., octocat)"
              className="w-full px-4 py-3 sm:px-5 sm:py-4 pl-10 sm:pl-12 rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-base sm:text-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              disabled={loading}
            />
            <svg className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-3 sm:px-8 sm:py-4 gradient-bg text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="hidden sm:inline">Loading...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {showDropdown && (recentSearches.length > 0 || favorites.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 glass-card z-50 overflow-hidden shadow-2xl max-h-96 overflow-y-auto"
            >
              {favorites.length > 0 && (
                <div className="p-2 sm:p-3">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                    ⭐ Favorites
                  </h3>
                  <div className="space-y-1">
                    {favorites.map(fav => (
                      <button
                        key={fav}
                        onClick={() => handleQuickSearch(fav)}
                        className="w-full text-left px-2 py-1.5 sm:px-3 sm:py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition flex items-center gap-2 group text-sm sm:text-base"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 truncate">{fav}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {recentSearches.length > 0 && (
                <div className="p-2 sm:p-3 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                    🕐 Recent Searches
                  </h3>
                  <div className="space-y-1">
                    {recentSearches.map(search => (
                      <button
                        key={search}
                        onClick={() => handleQuickSearch(search)}
                        className="w-full text-left px-2 py-1.5 sm:px-3 sm:py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition flex items-center gap-2 group text-sm sm:text-base"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 truncate">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      
      {/* Popular examples - hidden on very small screens, visible on sm and up */}
      <div className="mt-2 sm:mt-3 flex gap-1.5 sm:gap-2 justify-center text-xs text-gray-500 dark:text-gray-400 flex-wrap">
        <span>Popular:</span>
        {['octocat', 'torvalds', 'gaearon', 'vercel'].map(example => (
          <button
            key={example}
            onClick={() => handleQuickSearch(example)}
            className="hover:text-purple-600 dark:hover:text-purple-400 transition px-1 sm:px-0"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;