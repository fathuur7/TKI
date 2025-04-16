
// File: components/search/AdvancedSearchForm.jsx
import React from 'react';
import { Filter } from 'lucide-react';

interface AdvancedSearchFormProps {
  judul: string;
  setJudul: (value: string) => void;
  penulis: string;
  setPenulis: (value: string) => void;
  fakultas: string;
  setFakultas: (value: string) => void;
  handleSearch: () => void;
  toggleAdvancedSearch: () => void;
  handleClearAdvancedSearch: () => void;
}

const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({ 
  judul, 
  setJudul, 
  penulis, 
  setPenulis, 
  fakultas, 
  setFakultas, 
  handleSearch,
  toggleAdvancedSearch,
  handleClearAdvancedSearch
}) => {
  // Fakultas options
  const fakultasOptions = [
    "- Pilih -",
    "Fak. Teknik",
    "Fak. Ilmu Pendidikan",
    "Fak. Bahasa dan Seni",
    "Fak. Matematika dan IPA",
    "Fak. Ilmu Sosial dan Hukum",
    "Fak. Ekonomi",
    "Fak. Ilmu Olahraga"
  ];

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-blue-600" />
          Advanced Search
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="judul" className="text-sm font-medium text-gray-700 mb-1">
                Judul
              </label>
              <input
                type="text"
                id="judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Masukkan judul dokumen..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="fakultas" className="text-sm font-medium text-gray-700 mb-1">
                Fakultas
              </label>
              <select
                id="fakultas"
                value={fakultas}
                onChange={(e) => setFakultas(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {fakultasOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="penulis" className="text-sm font-medium text-gray-700 mb-1">
                Penulis
              </label>
              <input
                type="text"
                id="penulis"
                value={penulis}
                onChange={(e) => setPenulis(e.target.value)}
                placeholder="Masukkan nama penulis..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <div>
                <button
                  type="button"
                  onClick={toggleAdvancedSearch}
                  className="text-gray-600 hover:text-gray-800 text-sm mr-3"
                >
                  Simple Search
                </button>
                <button
                  type="button"
                  onClick={handleClearAdvancedSearch}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Clear
                </button>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 shadow-sm transition duration-150"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvancedSearchForm;
