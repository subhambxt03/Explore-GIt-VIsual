import React, { useMemo, useState } from 'react';
import RepoCard from './RepoCard';

const RepoList = ({ repos, languageFilter, sortBy, onLanguageFilterChange, onSortChange, availableLanguages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredAndSortedRepos = useMemo(() => {
    let filtered = repos;
    
    // Filter by language
    if (languageFilter !== 'all') {
      filtered = filtered.filter(repo => repo.language === languageFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(repo => 
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Sort
    switch (sortBy) {
      case 'stars':
        filtered = [...filtered].sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case 'forks':
        filtered = [...filtered].sort((a, b) => b.forks_count - a.forks_count);
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'oldest':
        filtered = [...filtered].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered = [...filtered].sort((a, b) => b.stargazers_count - a.stargazers_count);
    }
    
    return filtered;
  }, [repos, languageFilter, sortBy, searchTerm]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            value={languageFilter}
            onChange={(e) => onLanguageFilterChange(e.target.value)}
            className="px-4 py-2 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          >
            <option value="all">📚 All Languages</option>
            {availableLanguages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          >
            <option value="stars">⭐ Sort by Stars</option>
            <option value="forks">🔱 Sort by Forks</option>
            <option value="newest">🆕 Sort by Newest</option>
            <option value="oldest">📅 Sort by Oldest</option>
            <option value="name">📝 Sort by Name</option>
          </select>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 pl-10 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm w-48 md:w-64"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <p className="text-sm text-gray-500">
          Showing {filteredAndSortedRepos.length} of {repos.length} repositories
        </p>
      </div>
      
      {filteredAndSortedRepos.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400">No repositories found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAndSortedRepos.map((repo, index) => (
            <RepoCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RepoList;