import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchUserEvents } from '../../services/githubApi';

const ContributionHeatmap = ({ username }) => {
  const [contributions, setContributions] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    const loadContributions = async () => {
      setLoading(true);
      const events = await fetchUserEvents(username);
      const contributionMap = {};
      let total = 0;
      
      events.forEach(event => {
        if (event.type === 'PushEvent') {
          const date = event.created_at.split('T')[0];
          const count = event.payload.commits?.length || 1;
          contributionMap[date] = (contributionMap[date] || 0) + count;
          total += count;
        } else if (['CreateEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type)) {
          const date = event.created_at.split('T')[0];
          contributionMap[date] = (contributionMap[date] || 0) + 1;
          total += 1;
        }
      });
      
      setContributions(contributionMap);
      setTotalContributions(total);
      setLoading(false);
    };
    
    loadContributions();
  }, [username]);

  const getLast52Weeks = () => {
    const weeks = [];
    const today = new Date();
    for (let i = 51; i >= 0; i--) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - (today.getDay() + 7 * i));
      weeks.push(weekStart);
    }
    return weeks;
  };

  const getIntensity = (date) => {
    const count = contributions[date] || 0;
    if (count === 0) return 'bg-gray-200 dark:bg-gray-700';
    if (count < 3) return 'bg-green-200 dark:bg-green-900 hover:bg-green-300';
    if (count < 6) return 'bg-green-400 dark:bg-green-700 hover:bg-green-500';
    if (count < 10) return 'bg-green-600 dark:bg-green-500 hover:bg-green-700';
    return 'bg-green-800 dark:bg-green-300 hover:bg-green-900';
  };

  const getMonthLabels = () => {
    const months = [];
    const today = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      months.push(date);
    }
    return months;
  };

  if (loading) {
    return (
      <div className="glass-card p-4 sm:p-6">
        <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 sm:w-40 mb-3 sm:mb-4 animate-pulse"></div>
        <div className="h-32 sm:h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  const weeks = getLast52Weeks();
  const monthLabels = getMonthLabels();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 sm:p-6 overflow-x-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 sm:mb-4">
        <h3 className="text-base sm:text-xl font-semibold">
          🔥 Contribution Activity
        </h3>
        <div className="text-xs sm:text-sm">
          <span className="font-bold text-green-600 dark:text-green-400">{totalContributions}</span>
          <span className="text-gray-500"> total contributions</span>
        </div>
      </div>
      
      <div className="min-w-[500px] sm:min-w-[700px]">
        {/* Month labels - hide on very small screens */}
        <div className="hidden sm:flex mb-2 ml-6">
          {monthLabels.map((month, i) => (
            <div key={i} className="flex-1 text-xs text-gray-500">
              {month.toLocaleString('default', { month: 'short' })}
            </div>
          ))}
        </div>
        
        <div className="flex gap-0.5 sm:gap-1">
          {/* Day of week labels */}
          <div className="flex flex-col gap-0.5 sm:gap-1 mr-1 sm:mr-2 text-[10px] sm:text-xs text-gray-500">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          
          {/* Heatmap grid */}
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-0.5 sm:gap-1">
              {[1, 3, 5].map((dayOffset) => {
                const date = new Date(week);
                date.setDate(week.getDate() + dayOffset);
                const dateStr = date.toISOString().split('T')[0];
                const count = contributions[dateStr] || 0;
                return (
                  <div
                    key={dayOffset}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${getIntensity(dateStr)} transition-all duration-200 hover:scale-125 cursor-pointer hover:shadow-lg`}
                    title={`${dateStr}: ${count} contribution${count !== 1 ? 's' : ''}`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-3 sm:mt-4 flex items-center justify-end gap-1 sm:gap-2 text-[10px] sm:text-xs">
        <span className="text-gray-500">Less</span>
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-green-200 dark:bg-green-900"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-green-400 dark:bg-green-700"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-green-600 dark:bg-green-500"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-green-800 dark:bg-green-300"></div>
        <span className="text-gray-500">More</span>
      </div>
    </motion.div>
  );
};

export default ContributionHeatmap;