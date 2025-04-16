
// File: components/search/SimpleSearchForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Filter } from 'lucide-react';

interface SimpleSearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (query: string) => void;
  toggleAdvancedSearch: () => void;
  popularSearchTerms: string[];
  recentSearches: string[];
}

const SimpleSearchForm: React.FC<SimpleSearchFormProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  toggleAdvancedSearch, 
  popularSearchTerms,
  recentSearches
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
        if (
            suggestionsRef.current && 
            !suggestionsRef.current.contains(event.target as Node) && 
            inputRef.current && 
            !inputRef.current.contains(event.target as Node)
        ) {
            setShowSuggestions(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate suggestions based on input
  useEffect(() => {
    if (searchQuery.length > 1) {
      // Filter from popular terms
      const termSuggestions = popularSearchTerms.filter(term => 
        term.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const recentSuggestions = recentSearches.filter(term => 
        term.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Combine and remove duplicates
      const allSuggestions = [...new Set([...recentSuggestions, ...termSuggestions])].slice(0, 5);
      setSuggestions(allSuggestions);
      setShowSuggestions(allSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, recentSearches, popularSearchTerms]);

const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
    setShowSuggestions(false);
  };

interface SuggestionClickHandler {
    (suggestion: string): void;
}

const handleSuggestionClick: SuggestionClickHandler = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
    setShowSuggestions(false);
};

  const handleClearSearch = () => {
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="mb-8 relative">
      <form onSubmit={handleFormSubmit} className="flex items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
            placeholder="Cari buku atau penelitian..."
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <button 
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 shadow-sm transition duration-150"
        >
          Cari
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef} 
          className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200 overflow-hidden"
        >
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-800 border-b border-gray-100 last:border-b-0 flex items-center"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <Search className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
              <span className="truncate">{suggestion}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="text-center mt-2">
        <button
          onClick={toggleAdvancedSearch}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center mx-auto"
        >
          <Filter className="h-4 w-4 mr-1" /> Advanced Search
        </button>
      </div>
    </div>
  );
};

export default SimpleSearchForm;