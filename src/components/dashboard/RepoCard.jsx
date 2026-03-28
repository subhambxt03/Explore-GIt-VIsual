import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/analytics';

const RepoCard = ({ repo, index }) => {
  const languageColors = {
    JavaScript: 'bg-yellow-500',
    Python: 'bg-blue-500',
    Java: 'bg-red-500',
    TypeScript: 'bg-blue-400',
    'C++': 'bg-purple-500',
    'C#': 'bg-green-600',
    Ruby: 'bg-red-600',
    Go: 'bg-cyan-500',
    Rust: 'bg-orange-600',
    PHP: 'bg-indigo-500',
    HTML: 'bg-orange-500',
    CSS: 'bg-pink-500',
    Swift: 'bg-orange-400',
    Kotlin: 'bg-purple-400',
    Vue: 'bg-green-500',
    React: 'bg-blue-400',
    'Jupyter Notebook': 'bg-orange-300',
  };

  const langColor = languageColors[repo.language] || 'bg-gray-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="glass-card p-4 sm:p-5 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base sm:text-lg font-semibold text-purple-600 dark:text-purple-400 hover:underline truncate"
        >
          {repo.name}
        </a>
        <div className="flex gap-3">
          <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            {repo.forks_count}
          </span>
        </div>
      </div>
      
      {repo.description && (
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
          {repo.description}
        </p>
      )}
      
      <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 text-xs">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${langColor}`}></span>
            <span className="text-gray-700 dark:text-gray-300">{repo.language}</span>
          </span>
        )}
        <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(repo.updated_at)}
        </span>
      </div>
    </motion.div>
  );
};

export default RepoCard;