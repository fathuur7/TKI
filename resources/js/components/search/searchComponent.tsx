// File: components/search/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import SimpleSearchForm from './SimpleSearchForm';
import AdvancedSearchForm from './AdvancedSearchForm';
import RecentSearches from './RecentSearches';
import PopularTopics from './PopularTopics';
import SearchResults from './SearchResults';
import LoadingIndicator from './LoadingIndicator';
import NoResultsFound from './NoResultsFound';

const SearchComponent = () => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  interface SearchResult {
    id: string;
    title: string;
    description: string;
    url: string;
    score: number;
    judul_indonesia: string;
    penulis: string;
    nim: string;
    fakultas: string;
    judul_inggris: string;
    kata_kunci: string;
  }

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  // Advanced search state
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [fakultas, setFakultas] = useState('- Pilih -');
  const [lastSearchType, setLastSearchType] = useState('simple');
  const [lastAdvancedSearchParams, setLastAdvancedSearchParams] = useState<{ judul?: string; penulis?: string; fakultas?: string } | null>(null);

  // Popular search terms for suggestions
  const popularSearchTerms = [
    "teknik informatika",
    "machine learning",
    "sistem informasi",
    "aplikasi mobile",
    "metode penelitian",
    "pengembangan web",
    "skripsi",
    "artificial intelligence",
    "database",
    "monitoring"
  ];
  
  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setLastSearchType('simple');
    
    // Add to recent searches
    if (!recentSearches.includes(query)) {
      const newRecentSearches = [query, ...recentSearches].slice(0, 5);
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    }
    
    try {
      const rank = 0; // Default rank value
      const response = await fetch(`/search?q=${encodeURIComponent(query)}&rank=${rank}`);
      
      if (!response.ok) {
        throw new Error('Search request failed');
      }
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error performing search:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvancedSearch = async () => {
    if (!judul && fakultas === '- Pilih -' && !penulis) {
      return; // Don't search if all fields are empty
    }
    
    setIsLoading(true);
    setLastSearchType('advanced');
    setLastAdvancedSearchParams({ judul, penulis, fakultas });
    
    try {
      // Build the query parameters
      const params = new URLSearchParams();
      if (judul) params.append('judul', judul);
      if (penulis) params.append('penulis', penulis);
      if (fakultas !== '- Pilih -') params.append('fakultas', fakultas);
      
      // Make the API call
      const response = await fetch(`/advanced-search?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Advanced search request failed');
      }
      
      const data = await response.json();
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error performing advanced search:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  interface KeywordClickHandler {
    (keyword: string): void;
  }

  const handleKeywordClick: KeywordClickHandler = (keyword) => {
    if (showAdvancedSearch) {
      setShowAdvancedSearch(false);
    }
    setSearchQuery(keyword);
    handleSearch(keyword);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };
  
  const handleClearAdvancedSearch = () => {
    setJudul('');
    setPenulis('');
    setFakultas('- Pilih -');
  };
  
  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
    setSearchResults([]);
    
    if (showAdvancedSearch) {
      // Switching to simple search
      handleClearAdvancedSearch();
    } else {
      // Switching to advanced search
      setSearchQuery('');
    }
  };

  return (
    <main className="flex flex-col py-8 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Repositori Digital</h1>
        
        {!showAdvancedSearch ? (
          <SimpleSearchForm 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            toggleAdvancedSearch={toggleAdvancedSearch}
            popularSearchTerms={popularSearchTerms}
            recentSearches={recentSearches}
          />
        ) : (
          <AdvancedSearchForm 
            judul={judul}
            setJudul={setJudul}
            penulis={penulis}
            setPenulis={setPenulis}
            fakultas={fakultas}
            setFakultas={setFakultas}
            handleSearch={handleAdvancedSearch}
            toggleAdvancedSearch={toggleAdvancedSearch}
            handleClearAdvancedSearch={handleClearAdvancedSearch}
          />
        )}
        
        {/* Recent searches */}
        {recentSearches.length > 0 && searchResults.length === 0 && !searchQuery && !showAdvancedSearch && (
          <RecentSearches 
            recentSearches={recentSearches} 
            clearRecentSearches={clearRecentSearches}
            handleSearchTerm={handleSearch}
          />
        )}
        
        {/* Popular searches */}
        {searchResults.length === 0 && !searchQuery && !showAdvancedSearch && (
          <PopularTopics 
            popularSearchTerms={popularSearchTerms} 
            handleSearchTerm={handleSearch}
          />
        )}
        
        {/* Search results */}
        <div className="search-results">
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              {searchResults.length > 0 ? (
                <SearchResults 
                  results={searchResults}
                  lastSearchType={lastSearchType}
                  searchQuery={searchQuery}
                  lastAdvancedSearchParams={lastAdvancedSearchParams || undefined}
                  handleKeywordClick={handleKeywordClick}
                />
              ) : (
                (searchQuery && !showAdvancedSearch) || 
                (showAdvancedSearch && (lastAdvancedSearchParams?.judul || 
                  lastAdvancedSearchParams?.penulis || 
                  lastAdvancedSearchParams?.fakultas !== '- Pilih -')) ? (
                  <NoResultsFound 
                    searchQuery={searchQuery} 
                    isAdvanced={showAdvancedSearch}
                  />
                ) : null
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchComponent;



