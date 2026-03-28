import { useState, useEffect, useCallback } from 'react';
import { fetchGitHubUser, fetchUserRepos, fetchUserEvents } from '../services/githubApi';
import { computeRepoStats, calculateProfileScore } from '../utils/analytics';
import { toast } from 'react-hot-toast';

export const useGitHubData = () => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [repoStats, setRepoStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async (username) => {
    if (!username?.trim()) {
      toast.error('Please enter a GitHub username');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Fetch user data, repositories, and events in parallel
      const [user, reposData, eventsData] = await Promise.all([
        fetchGitHubUser(username),
        fetchUserRepos(username),
        fetchUserEvents(username)
      ]);
      
      setUserData(user);
      setRepos(reposData);
      setEvents(eventsData);
      
      // Calculate repository statistics
      const stats = computeRepoStats(reposData);
      setRepoStats(stats);
      
      toast.success(`Loaded ${user.name || user.login}'s profile`);
      return { user, repos: reposData, stats, events: eventsData };
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      toast.error(err.message || 'Failed to fetch user data');
      setUserData(null);
      setRepos([]);
      setRepoStats(null);
      setEvents([]);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearData = useCallback(() => {
    setUserData(null);
    setRepos([]);
    setRepoStats(null);
    setEvents([]);
    setError(null);
  }, []);

  const profileScore = userData && repoStats ? calculateProfileScore(userData, repoStats) : 0;

  return {
    userData,
    repos,
    repoStats,
    events,
    loading,
    error,
    profileScore,
    fetchUserData,
    clearData
  };
};