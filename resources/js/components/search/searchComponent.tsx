import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, X, BarChart2 } from 'lucide-react';

interface SearchResult {
  url: string;
  judul_indonesia: string;
  judul_inggris: string;
  penulis: string;
  nim: string;
  fakultas: string;
  kata_kunci: string[];
}

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample data for demonstration (in practice, this would come from your API)
  const sampleData: SearchResult[] = [
    {
      url: "https://digilib.unesa.ac.id/detail/OThiM2VkYjAtNTk0OS0xMWViLWI3OGMtODU3ZTZhNTNlYjVj",
      judul_indonesia: "Sistem Informasi Rekomendasi Penjadwalan Sidang Skripsi Dengan Metode Depth First Search Pada Jurusan Teknik Informatika Universitas Negeri Surabaya",
      judul_inggris: "Information System for Recommended Thesis Jugdement Schedule at Computer Science Department State University of Surabaya",
      penulis: "EDTALIA SANTI NURJANAH",
      nim: "16051214011",
      fakultas: "Fak. Teknik",
      kata_kunci: ["teknik informatika", "penjadwalan", "depth first search"]
    },
    {
      url: "https://digilib.unesa.ac.id/detail/Y2NmYTI5YTAtOThiNy0xMWU5LWE2ZWMtOWRjYzM0N2MwYWRk",
      judul_indonesia: "PENGEMBANGAN WEB REPOSITORI UNTUK MENINGKATKAN PENGETAHUAN KOGNITIF TENTANG METODE PENELITIAN PADA MAHASISWA DI JURUSAN TEKNIK INFORMATIKA UNIVERSITAS NEGERI SURABAYA",
      judul_inggris: "DEVELOPMENT OF WEB REPOSITORY TO IMPROVE COGNITIVE KNOWLEDGE ABOUT RESEARCH METHODS IN STUDENTS IN INFORMATICS ENGINEERING DEPARTMENT OF UNIVERSITAS NEGERI SURABAYA",
      penulis: "RIFANI PUJI RAHMAWATI",
      nim: "16050974041",
      fakultas: "Fak. Teknik",
      kata_kunci: ["teknik informatika", "web repositori", "metode penelitian"]
    },
    {
      url: "https://digilib.unesa.ac.id/detail/sample-url-3",
      judul_indonesia: "Analisis Performa Algoritma Machine Learning pada Klasifikasi Dokumen",
      judul_inggris: "Performance Analysis of Machine Learning Algorithms for Document Classification",
      penulis: "AHMAD WIDODO",
      nim: "17050974099",
      fakultas: "Fak. Teknik",
      kata_kunci: ["machine learning", "klasifikasi", "analisis performa"]
    },
    {
      url: "https://digilib.unesa.ac.id/detail/sample-url-4",
      judul_indonesia: "Pengembangan Aplikasi Mobile untuk Monitoring Aktivitas Mahasiswa",
      judul_inggris: "Mobile Application Development for Student Activity Monitoring",
      penulis: "SITI NURHALIZA",
      nim: "18050974123",
      fakultas: "Fak. Teknik",
      kata_kunci: ["mobile", "monitoring", "aplikasi"]
    }
  ];

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

  // Click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
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
      // Filter from popular terms and sample data
      const titleSuggestions = sampleData
        .filter(item => 
          item.judul_indonesia.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.judul_inggris.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(item => item.judul_indonesia.substring(0, 60) + (item.judul_indonesia.length > 60 ? '...' : ''));

      const termSuggestions = popularSearchTerms.filter(term => 
        term.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const recentSuggestions = recentSearches.filter(term => 
        term.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Combine and remove duplicates
      const allSuggestions = [...new Set([...recentSuggestions, ...termSuggestions, ...titleSuggestions])].slice(0, 5);
      setSuggestions(allSuggestions);
      setShowSuggestions(allSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, recentSearches]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement> | null, query = searchQuery) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    setShowSuggestions(false);
    
    // Add to recent searches
    if (!recentSearches.includes(query)) {
      const newRecentSearches = [query, ...recentSearches].slice(0, 5);
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    }
    
    // Simulate API delay
    setTimeout(() => {
      // Filter results based on search query
      const results = sampleData.filter(item => 
        item.judul_indonesia.toLowerCase().includes(query.toLowerCase()) ||
        item.judul_inggris.toLowerCase().includes(query.toLowerCase()) ||
        item.penulis.toLowerCase().includes(query.toLowerCase()) ||
        item.kata_kunci.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
      );
      
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(null, suggestion);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    handleSearch(null, keyword);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

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
    <main className="flex flex-col py-8 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Repositori Digital</h1>
        
        <div className="mb-8 relative">
          <form onSubmit={handleSearch} className="flex items-center">
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
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  title="Clear search"
                  aria-label="Clear search"
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
        </div>
        
        {/* Recent searches */}
        {recentSearches.length > 0 && searchResults.length === 0 && !searchQuery && (
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
                  onClick={() => handleSuggestionClick(term)}
                >
                  {term}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Popular searches */}
        {searchResults.length === 0 && !searchQuery && (
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
                  onClick={() => handleSuggestionClick(term)}
                >
                  {term}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Search results */}
        <div className="search-results">
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : (
            <>
              {searchResults.length > 0 ? (
                <>
                  <div className="text-sm text-gray-600 mb-4 px-4">
                    Ditemukan {searchResults.length} hasil untuk "{searchQuery}"
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
                    {searchResults.map((result, index) => (
                      <div key={index} className="p-4 hover:bg-blue-50 transition duration-150">
                        <div className="flex flex-col">
                          <a 
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-500 hover:underline mb-1 flex items-center"
                          >
                            {extractDomain(result.url)}
                          </a>
                          
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
                            {result.kata_kunci.map((keyword, kIdx) => (
                              <span 
                                key={kIdx} 
                                className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs cursor-pointer hover:bg-blue-100"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleKeywordClick(keyword);
                                }}
                              >
                                #{keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                searchQuery && (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <div className="text-gray-400 mb-4">
                      <Search className="h-12 w-12 mx-auto" />
                    </div>
                    <p className="text-gray-700 text-lg font-medium">Tidak ada hasil yang ditemukan untuk "{searchQuery}"</p>
                    <p className="text-gray-600 text-sm mt-2">Coba dengan kata kunci lain atau periksa ejaan Anda</p>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchComponent;