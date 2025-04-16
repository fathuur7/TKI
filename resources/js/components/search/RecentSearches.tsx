
// File: components/search/RecentSearches.jsx
import React from 'react';
import { Clock } from 'lucide-react';

interface RecentSearchesProps {
  recentSearches: string[];
  clearRecentSearches: () => void;
  handleSearchTerm: (term: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ recentSearches, clearRecentSearches, handleSearchTerm }) => {
  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md text-gray-700 font-medium flex items-center">
          <Clock className="h-4 w-4 mr-2 text-gray-500" />
          Pencarian Terakhir
        </h3>
        <button 
          onClick={clearRecentSearches}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Hapus semua
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((term, index) => (
          <div 
            key={index} 
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition duration-150"
            onClick={() => handleSearchTerm(term)}
          >
            {term}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;