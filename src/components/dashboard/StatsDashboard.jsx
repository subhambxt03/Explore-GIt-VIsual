import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const StatCard = ({ icon, label, value, color, prefix = '', suffix = '' }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="glass-card p-3 sm:p-4 md:p-6 text-center group cursor-pointer"
  >
    <div className={`text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 transition-transform group-hover:scale-110 inline-block ${color}`}>
      {icon}
    </div>
    <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
      <CountUp 
        end={value} 
        duration={2.5} 
        separator="," 
        prefix={prefix}
        suffix={suffix}
        enableScrollSpy
        scrollSpyOnce
      />
    </div>
    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 font-medium">{label}</p>
  </motion.div>
);

const StatsDashboard = ({ user, repoStats, repos }) => {
  const stats = [
    { icon: '👥', label: 'Followers', value: user.followers, color: 'text-blue-500' },
    { icon: '👤', label: 'Following', value: user.following, color: 'text-green-500' },
    { icon: '📁', label: 'Repos', value: user.public_repos, color: 'text-purple-500' },
    { icon: '⭐', label: 'Stars', value: repoStats?.totalStars || 0, color: 'text-yellow-500' },
    { icon: '🔱', label: 'Forks', value: repoStats?.totalForks || 0, color: 'text-orange-500' },
    { icon: '📊', label: 'Avg Stars', value: parseFloat(repoStats?.avgStarsPerRepo) || 0, color: 'text-pink-500', suffix: '', format: (v) => v.toFixed(1) },
  ];

  const activeRepos = repos?.filter(r => !r.archived && !r.disabled).length || 0;
  const archivedRepos = repos?.filter(r => r.archived).length || 0;

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      {/* Additional stats row - responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <div className="glass-card p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-500 dark:text-green-400">
            <CountUp end={activeRepos} duration={2} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Active Repos</p>
        </div>
        <div className="glass-card p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500 dark:text-yellow-400">
            <CountUp end={repoStats?.mostUsedLang === 'N/A' ? 0 : 1} duration={2} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Primary Lang</p>
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">{repoStats?.mostUsedLang}</p>
        </div>
        <div className="glass-card p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-500 dark:text-purple-400">
            <CountUp end={repos?.length || 0} duration={2} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Repos</p>
        </div>
        <div className="glass-card p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-500 dark:text-blue-400">
            <CountUp end={archivedRepos} duration={2} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Archived</p>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;