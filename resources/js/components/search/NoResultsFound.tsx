
// File: components/search/NoResultsFound.jsx
import React from 'react';
import { Search } from 'lucide-react';

interface NoResultsFoundProps {
  searchQuery: string;
  isAdvanced: boolean;
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ searchQuery, isAdvanced }) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <div className="text-gray-400 mb-4">
        <Search className="h-12 w-12 mx-auto" />
      </div>
      {isAdvanced ? (
        <>
          <p className="text-gray-700 text-lg font-medium">Tidak ada hasil yang ditemukan</p>
          <p className="text-gray-600 text-sm mt-2">
            Coba dengan parameter pencarian yang berbeda
          </p>
        </>
      ) : (
        <>
          <p className="text-gray-700 text-lg font-medium">Tidak ada hasil yang ditemukan untuk "{searchQuery}"</p>
          <p className="text-gray-600 text-sm mt-2">Coba dengan kata kunci lain atau periksa ejaan Anda</p>
        </>
      )}
    </div>
  );
};

export default NoResultsFound;