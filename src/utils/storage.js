// Local storage utilities for recent searches and favorites

const STORAGE_KEYS = {
  RECENT: 'gh_recent_searches',
  FAVORITES: 'gh_favorites',
  THEME: 'gh_theme'
};

export const getRecent = () => {
  try {
    const recent = localStorage.getItem(STORAGE_KEYS.RECENT);
    return recent ? JSON.parse(recent) : [];
  } catch (error) {
    console.error('Error reading recent searches:', error);
    return [];
  }
};

export const saveRecent = (username) => {
  try {
    const recent = getRecent();
    const filtered = [username, ...recent.filter(u => u !== username)].slice(0, 5);
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error saving recent search:', error);
  }
};

export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

export const toggleFavorite = (username) => {
  try {
    const favorites = getFavorites();
    const exists = favorites.includes(username);
    const newFavorites = exists 
      ? favorites.filter(f => f !== username)
      : [...favorites, username];
    
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
    return newFavorites;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return [];
  }
};

export const isFavorite = (username) => {
  return getFavorites().includes(username);
};

export const getTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  } catch (error) {
    return 'light';
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

export const clearRecentSearches = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.RECENT);
  } catch (error) {
    console.error('Error clearing recent searches:', error);
  }
};

export const clearFavorites = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
  } catch (error) {
    console.error('Error clearing favorites:', error);
  }
};