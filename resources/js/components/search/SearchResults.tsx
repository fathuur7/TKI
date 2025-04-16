

// File: components/search/SearchResults.jsx
import React from 'react';

interface AdvancedSearchParams {
  judul?: string;
  penulis?: string;
  fakultas?: string;
}

interface SearchResultsProps {
  results: Array<{
    url: string;
    score: number;
    judul_indonesia: string;
    penulis: string;
    nim: string;
    fakultas: string;
    judul_inggris: string;
    kata_kunci: string;
  }>;
  lastSearchType: string;
  searchQuery: string;
  lastAdvancedSearchParams?: AdvancedSearchParams;
  handleKeywordClick: (keyword: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  lastSearchType, 
  searchQuery, 
  lastAdvancedSearchParams,
  handleKeywordClick 
}) => {
  // Function to get keywords as array
const getKeywordsArray = (keywordsString: string | undefined): string[] => {
    if (!keywordsString) return [];
    return keywordsString.split(',').map((keyword: string) => keyword.trim());
};

  // Extract domain from URL
const extractDomain = (url: string): string => {
    try {
      const domain = new URL(url).hostname;
      return domain;
    } catch {
      console.error("Invalid URL:", url);
      return url;
    }
};

  return (
    <>
      <div className="text-sm text-gray-600 mb-4 px-4">
        {lastSearchType === 'simple' ? (
          <>Ditemukan {results.length} hasil{searchQuery ? ` untuk "${searchQuery}"` : ""}</>
        ) : (
          <>
            Ditemukan {results.length} hasil untuk pencarian lanjutan
            {lastAdvancedSearchParams?.judul && <span className="font-medium"> • Judul: {lastAdvancedSearchParams.judul}</span>}
            {lastAdvancedSearchParams?.penulis && <span className="font-medium"> • Penulis: {lastAdvancedSearchParams.penulis}</span>}
            {lastAdvancedSearchParams && lastAdvancedSearchParams.fakultas !== '- Pilih -' && <span className="font-medium"> • Fakultas: {lastAdvancedSearchParams.fakultas}</span>}
          </>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
        {results.map((result, index) => (
          <div key={index} className="p-4 hover:bg-blue-50 transition duration-150">
            <div className="flex flex-col">
              <div className="flex justify-between items-start">
                <a 
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:underline mb-1 flex items-center"
                >
                  {extractDomain(result.url)}
                </a>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">
                  Score: {parseFloat(result.score).toFixed(2)}
                </span>
              </div>
              
              <a 
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-blue-800 font-medium hover:underline mb-2 leading-tight"
              >
                {result.judul_indonesia}
              </a>
              
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Penulis:</span> {result.penulis} ({result.nim}) - {result.fakultas}
              </p>
              
              <p className="text-sm text-gray-800 mb-3 italic">
                {result.judul_inggris}
              </p>
              
              <div className="mt-1 flex flex-wrap gap-2">
                {getKeywordsArray(result.kata_kunci).map((keyword: string, kIdx: number) => (
                    <span 
                        key={kIdx} 
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs cursor-pointer hover:bg-blue-100"
                        onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                            e.preventDefault();
                            handleKeywordClick(keyword);
                        }}
                    >
                        #{keyword}
                    </span>
                ))}  </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
