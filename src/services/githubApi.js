const GITHUB_API_BASE = 'https://api.github.com';

export const fetchGitHubUser = async (username) => {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found');
    } else if (response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error(`API error: ${response.status}`);
  }
  
  return await response.json();
};

export const fetchUserRepos = async (username) => {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated&direction=desc`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  
  return await response.json();
};

export const fetchUserEvents = async (username) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/events?per_page=100`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
};