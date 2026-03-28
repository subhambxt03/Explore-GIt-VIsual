import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import logo from './assets/logo.png';  // Import your PNG logo

import SearchBar from './components/search/SearchBar';
import ProfileCard from './components/dashboard/ProfileCard';
import StatsDashboard from './components/dashboard/StatsDashboard';
import RepoList from './components/dashboard/RepoList';
import LanguageChart from './components/dashboard/LanguageChart';
import ComparisonSection from './components/comparison/ComparisonSection';
import ThemeToggle from './components/common/ThemeToggle';
import LoadingSkeleton from './components/common/LoadingSkeleton';
import ContributionHeatmap from './components/heatmap/ContributionHeatmap';

import { fetchGitHubUser, fetchUserRepos } from './services/githubApi';
import { computeRepoStats, calculateProfileScore } from './utils/analytics';
import { getRecent, saveRecent, toggleFavorite, isFavorite, getFavorites } from './utils/storage';

function App() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [repoStats, setRepoStats] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [languageFilter, setLanguageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('stars');
  const [compareMode, setCompareMode] = useState(false);

  useEffect(() => {
    setRecentSearches(getRecent());
    setFavorites(getFavorites());
  }, []);

  const fetchUserData = useCallback(async (searchUsername) => {
    if (!searchUsername?.trim()) {
      toast.error('Please enter a GitHub username');
      return;
    }
    
    setLoading(true);
    try {
      const [user, reposData] = await Promise.all([
        fetchGitHubUser(searchUsername),
        fetchUserRepos(searchUsername)
      ]);
      
      setUserData(user);
      setRepos(reposData);
      const stats = computeRepoStats(reposData);
      setRepoStats(stats);
      
      saveRecent(searchUsername);
      setRecentSearches(getRecent());
      
      toast.success(`Loaded ${user.name || user.login}'s profile`);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(error.message || 'Failed to fetch user data');
      setUserData(null);
      setRepos([]);
      setRepoStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFavorite = () => {
    if (!userData) return;
    const newFavs = toggleFavorite(userData.login);
    setFavorites(newFavs);
    toast.success(isFavorite(userData.login) ? 'Added to favorites' : 'Removed from favorites');
  };

  const profileScore = userData && repoStats ? calculateProfileScore(userData, repoStats) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card shadow-lg">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Larger Logo - Increased size */}
              <img 
                src={logo} 
                alt="GitHub" 
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
              />
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text">
                GitHub Profile Visualizer
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              {userData && (
                <>
                  <button
                    onClick={handleFavorite}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Favorite"
                  >
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite(userData.login) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600 dark:text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}?user=${userData.login}`;
                      navigator.clipboard.writeText(url);
                      toast.success('Profile link copied!');
                    }}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Share"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <SearchBar onSearch={fetchUserData} recentSearches={recentSearches} favorites={favorites} loading={loading} />

        {userData && (
          <div className="mb-4 sm:mb-6 flex justify-end">
            <button
              onClick={() => setCompareMode(!compareMode)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg gradient-bg text-white hover:shadow-lg transition flex items-center gap-2"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              {compareMode ? 'Exit Compare Mode' : 'Compare Users'}
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingSkeleton />
          ) : userData ? (
            <motion.div
              id="dashboard-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 sm:space-y-6"
            >
              <ProfileCard user={userData} profileScore={profileScore} />
              <StatsDashboard user={userData} repoStats={repoStats} repos={repos} />
              <ContributionHeatmap username={userData.login} />
              {repoStats?.langMap && repoStats.langMap.size > 0 && (
                <LanguageChart langMap={repoStats.langMap} />
              )}
              <RepoList
                repos={repos}
                languageFilter={languageFilter}
                sortBy={sortBy}
                onLanguageFilterChange={setLanguageFilter}
                onSortChange={setSortBy}
                availableLanguages={repoStats?.langMap ? Array.from(repoStats.langMap.keys()) : []}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-20"
            >
              {/* Larger logo in welcome screen */}
              <img 
                src={logo} 
                alt="GitHub" 
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-6 opacity-50 object-contain"
              />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Welcome to GitHub Profile Visualizer
              </h2>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500 px-4">
                Enter a GitHub username above to get started
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {compareMode && userData && (
          <div className="mt-6 sm:mt-8">
            <ComparisonSection currentUser={userData} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;