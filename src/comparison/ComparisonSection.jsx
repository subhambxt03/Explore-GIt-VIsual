import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { fetchGitHubUser, fetchUserRepos } from '../../services/githubApi';
import { computeRepoStats } from '../../utils/analytics';

const ComparisonSection = ({ currentUser }) => {
  const [compareUsername, setCompareUsername] = useState('');
  const [compareUser, setCompareUser] = useState(null);
  const [compareStats, setCompareStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!compareUsername.trim()) {
      toast.error('Enter a username to compare');
      return;
    }
    
    if (compareUsername === currentUser.login) {
      toast.error('Cannot compare with the same user');
      return;
    }
    
    setLoading(true);
    try {
      const [user, repos] = await Promise.all([
        fetchGitHubUser(compareUsername),
        fetchUserRepos(compareUsername)
      ]);
      const stats = computeRepoStats(repos);
      setCompareUser(user);
      setCompareStats(stats);
      toast.success(`Loaded ${user.login}'s data for comparison`);
    } catch (error) {
      toast.error(error.message);
      setCompareUser(null);
      setCompareStats(null);
    } finally {
      setLoading(false);
    }
  };

  const ComparisonRow = ({ label, currentValue, compareValue, format = (v) => v, icon = '' }) => {
    const current = format(currentValue);
    const compare = compareValue !== undefined ? format(compareValue) : '-';
    const isHigher = typeof currentValue === 'number' && typeof compareValue === 'number' && currentValue > compareValue;
    const isLower = typeof currentValue === 'number' && typeof compareValue === 'number' && currentValue < compareValue;
    
    return (
      <div className="grid grid-cols-3 gap-2 sm:gap-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition text-sm sm:text-base">
        <span className="font-medium flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
          {icon && <span className="text-sm sm:text-base">{icon}</span>}
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">{label.slice(0, 3)}</span>
        </span>
        <span className={`text-right font-semibold text-xs sm:text-sm ${isHigher ? 'text-green-500' : ''}`}>
          {current}
          {isHigher && <span className="ml-0.5 sm:ml-1 text-xs">↑</span>}
        </span>
        <span className={`text-right font-semibold text-xs sm:text-sm ${isLower ? 'text-red-500' : ''}`}>
          {compare}
          {isLower && <span className="ml-0.5 sm:ml-1 text-xs">↓</span>}
        </span>
      </div>
    );
  };

  const formatLargeNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  return (
    <div className="glass-card p-4 sm:p-6">
      <h3 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        Compare Developers
      </h3>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
        <input
          type="text"
          value={compareUsername}
          onChange={(e) => setCompareUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
          onKeyPress={(e) => e.key === 'Enter' && handleCompare()}
        />
        <button
          onClick={handleCompare}
          disabled={loading}
          className="px-4 py-2 sm:px-6 sm:py-3 gradient-bg text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 font-medium text-sm sm:text-base"
        >
          {loading ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Compare'
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {compareUser && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-3 gap-2 sm:gap-4 py-2 sm:py-3 font-semibold text-gray-600 dark:text-gray-400 border-b-2 border-gray-300 dark:border-gray-600 text-xs sm:text-sm">
              <span>Metric</span>
              <span className="text-right flex items-center justify-end gap-1">
                <img src={currentUser.avatar_url} alt={currentUser.login} className="w-4 h-4 sm:w-5 sm:h-5 rounded-full" />
                <span className="hidden sm:inline">{currentUser.login}</span>
                <span className="sm:hidden">{currentUser.login.slice(0, 5)}</span>
              </span>
              <span className="text-right flex items-center justify-end gap-1">
                <img src={compareUser.avatar_url} alt={compareUser.login} className="w-4 h-4 sm:w-5 sm:h-5 rounded-full" />
                <span className="hidden sm:inline">{compareUser.login}</span>
                <span className="sm:hidden">{compareUser.login.slice(0, 5)}</span>
              </span>
            </div>
            
            <ComparisonRow 
              label="Followers" 
              icon="👥"
              currentValue={currentUser.followers} 
              compareValue={compareUser.followers}
              format={formatLargeNumber}
            />
            <ComparisonRow 
              label="Following" 
              icon="👤"
              currentValue={currentUser.following} 
              compareValue={compareUser.following}
              format={formatLargeNumber}
            />
            <ComparisonRow 
              label="Repos" 
              icon="📁"
              currentValue={currentUser.public_repos} 
              compareValue={compareUser.public_repos}
            />
            <ComparisonRow 
              label="Stars" 
              icon="⭐"
              currentValue={compareStats?.totalStars || 0} 
              compareValue={compareStats?.totalStars || 0}
              format={formatLargeNumber}
            />
            <ComparisonRow 
              label="Forks" 
              icon="🔱"
              currentValue={compareStats?.totalForks || 0} 
              compareValue={compareStats?.totalForks || 0}
              format={formatLargeNumber}
            />
            <ComparisonRow 
              label="Top Lang" 
              icon="💻"
              currentValue={compareStats?.mostUsedLang || 'N/A'} 
              compareValue={compareStats?.mostUsedLang || 'N/A'}
            />
            
            {compareStats?.topStarredRepo && (
              <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-[10px] sm:text-xs text-gray-500 mb-1">🏆 Top Starred Repo</p>
                <p className="text-xs sm:text-sm font-semibold truncate">{compareStats.topStarredRepo.name}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">⭐ {compareStats.topStarredRepo.stargazers_count} stars</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {!compareUser && !loading && compareUsername && (
        <p className="text-center text-gray-500 py-4 text-sm">Enter a username above to start comparing</p>
      )}
    </div>
  );
};

export default ComparisonSection;