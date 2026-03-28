import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Profile Card Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 animate-pulse mx-auto sm:mx-0"></div>
          <div className="flex-1 space-y-2 sm:space-y-3">
            <div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-700 rounded w-2/3 sm:w-1/3 animate-pulse mx-auto sm:mx-0"></div>
            <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
            <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-3 justify-center sm:justify-start">
              <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded w-16 sm:w-20 animate-pulse"></div>
              <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded w-16 sm:w-20 animate-pulse"></div>
              <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded w-20 sm:w-24 animate-pulse"></div>
            </div>
          </div>
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse mx-auto sm:mx-0"></div>
        </div>
      </motion.div>
      
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card p-3 sm:p-4 md:p-6">
            <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-2 sm:mb-3 animate-pulse"></div>
            <div className="h-5 sm:h-6 bg-gray-300 dark:bg-gray-700 rounded w-12 sm:w-16 mx-auto mb-1 sm:mb-2 animate-pulse"></div>
            <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded w-14 sm:w-20 mx-auto animate-pulse"></div>
          </div>
        ))}
      </div>
      
      {/* Heatmap Skeleton */}
      <div className="glass-card p-4 sm:p-6">
        <div className="h-5 sm:h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 sm:w-40 mb-3 sm:mb-4 animate-pulse"></div>
        <div className="h-32 sm:h-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      
      {/* Chart Skeleton */}
      <div className="glass-card p-4 sm:p-6">
        <div className="h-5 sm:h-6 bg-gray-300 dark:bg-gray-700 rounded w-36 sm:w-48 mb-3 sm:mb-4 animate-pulse"></div>
        <div className="h-48 sm:h-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      
      {/* Repo List Skeleton */}
      <div className="glass-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="h-8 sm:h-10 bg-gray-300 dark:bg-gray-700 rounded w-28 sm:w-32 animate-pulse"></div>
            <div className="h-8 sm:h-10 bg-gray-300 dark:bg-gray-700 rounded w-28 sm:w-32 animate-pulse"></div>
          </div>
          <div className="h-8 sm:h-10 bg-gray-300 dark:bg-gray-700 rounded w-28 sm:w-32 animate-pulse"></div>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 sm:h-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;