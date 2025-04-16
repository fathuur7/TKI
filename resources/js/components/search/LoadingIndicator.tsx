
// File: components/search/LoadingIndicator.jsx
import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
        <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;