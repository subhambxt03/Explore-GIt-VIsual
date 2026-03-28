export const computeRepoStats = (repos) => {
  if (!repos || repos.length === 0) {
    return {
      totalStars: 0,
      totalForks: 0,
      langMap: new Map(),
      mostUsedLang: 'N/A',
      topStarredRepo: null,
      avgStarsPerRepo: 0,
      totalRepos: 0
    };
  }
  
  let totalStars = 0;
  let totalForks = 0;
  const langMap = new Map();
  let topStarredRepo = null;
  
  repos.forEach(repo => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;
    
    if (repo.language) {
      langMap.set(repo.language, (langMap.get(repo.language) || 0) + 1);
    }
    
    if (!topStarredRepo || repo.stargazers_count > topStarredRepo.stargazers_count) {
      topStarredRepo = repo;
    }
  });
  
  const mostUsedLang = [...langMap.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  const avgStarsPerRepo = repos.length ? (totalStars / repos.length).toFixed(1) : 0;
  
  return {
    totalStars,
    totalForks,
    langMap,
    mostUsedLang,
    topStarredRepo,
    avgStarsPerRepo,
    totalRepos: repos.length
  };
};

export const calculateProfileScore = (user, repoStats) => {
  if (!user) return 0;
  
  let score = 0;
  
  // Followers factor (max 30 points)
  score += Math.min(user.followers / 100, 30);
  
  // Following factor (max 10 points)
  score += Math.min(user.following / 50, 10);
  
  // Repository count (max 20 points)
  score += Math.min((repoStats?.totalRepos || 0) / 20, 20);
  
  // Stars earned (max 30 points)
  score += Math.min((repoStats?.totalStars || 0) / 200, 30);
  
  // Account age (max 10 points)
  const accountAge = (new Date() - new Date(user.created_at)) / (1000 * 60 * 60 * 24 * 365);
  score += Math.min(accountAge / 5, 10);
  
  return Math.min(Math.floor(score), 100);
};

export const getActivityScore = (repos) => {
  if (!repos || repos.length === 0) return 0;
  
  const now = new Date();
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
  const recentRepos = repos.filter(repo => {
    const updated = new Date(repo.updated_at);
    return updated > thirtyDaysAgo;
  });
  
  return Math.min((recentRepos.length / repos.length) * 100, 100);
};

export const getLanguageStrength = (langMap, totalRepos) => {
  if (!langMap || totalRepos === 0) return 0;
  
  const primaryLangCount = Math.max(...langMap.values());
  return (primaryLangCount / totalRepos) * 100;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return dateStr;
  }
};

export const getAccountAge = (createdAt) => {
  if (!createdAt) return 'N/A';
  
  try {
    const created = new Date(createdAt);
    const now = new Date();
    const years = now.getFullYear() - created.getFullYear();
    const months = now.getMonth() - created.getMonth();
    
    if (years > 0) return `${years} year${years > 1 ? 's' : ''}`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''}`;
    const days = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    return `${days} day${days > 1 ? 's' : ''}`;
  } catch (error) {
    return 'N/A';
  }
};

export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};