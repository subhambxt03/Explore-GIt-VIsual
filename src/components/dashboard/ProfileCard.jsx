import React from 'react';
import { motion } from 'framer-motion';
import { getAccountAge } from '../../utils/analytics';

const ProfileCard = ({ user, profileScore }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
        <div className="relative">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-purple-500 shadow-xl"
          />
          <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-green-500 rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center sm:justify-start">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{user.name || user.login}</h2>
            <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">@{user.login}</span>
            {user.hireable && (
              <span className="px-2 py-0.5 sm:py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                Available
              </span>
            )}
          </div>
          
          {user.bio && (
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">{user.bio}</p>
          )}
          
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
            {user.location && (
              <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {user.location}
              </span>
            )}
            {user.company && (
              <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {user.company}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Joined {getAccountAge(user.created_at)} ago
            </span>
          </div>
        </div>
        
        <div className="text-center mt-3 sm:mt-0">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24">
            <svg className="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${profileScore * 2.26} 226`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec489a" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{profileScore}</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">Profile Score</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;