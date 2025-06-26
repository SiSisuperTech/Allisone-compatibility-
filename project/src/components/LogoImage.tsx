import React, { useState } from 'react';

interface LogoImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackText?: string;
}

const LogoImage: React.FC<LogoImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  fallbackText = "Logo" 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // If no src provided or error occurred, show fallback
  if (!src || hasError) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center ${className}`}>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center ${className}`}>
          <span className="text-xs text-gray-500 dark:text-gray-400">...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'hidden' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </>
  );
};

export default LogoImage;
