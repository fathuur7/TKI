

// File: components/search/PopularTopics.jsx
import React from 'react';
import { BarChart2 } from 'lucide-react';

interface PopularTopicsProps {
  popularSearchTerms: string[];
  handleSearchTerm: (term: string) => void;
}

const PopularTopics: React.FC<PopularTopicsProps> = ({ popularSearchTerms, handleSearchTerm }) => {
  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-md text-gray-700 font-medium mb-2 flex items-center">
        <BarChart2 className="h-4 w-4 mr-2 text-gray-500" />
        Topik Populer
      </h3>
      <div className="flex flex-wrap gap-2">
        {popularSearchTerms.slice(0, 6).map((term, index) => (
          <div 
            key={index} 
            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-100 transition duration-150"
            onClick={() => handleSearchTerm(term)}
          >
            {term}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTopics;