import React, { useState } from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface EnhancedLogoProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  size?: 'small' | 'medium' | 'large';
  shape?: 'square' | 'circle' | 'rounded';
  showBorder?: boolean;
  notionDocUrl?: string;
  onDocumentClick?: (url: string) => void;
}

const EnhancedLogo: React.FC<EnhancedLogoProps> = ({ 
  src, 
  alt, 
  className = "",
  fallbackText = "Logo",
  size = 'medium',
  shape = 'rounded',
  showBorder = true,
  notionDocUrl,
  onDocumentClick
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

  const handleDocumentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (notionDocUrl && onDocumentClick) {
      onDocumentClick(notionDocUrl);
    }
  };

  // Size classes
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-10 w-10',
    large: 'h-12 w-12'
  };

  // Shape classes
  const shapeClasses = {
    square: '',
    circle: 'rounded-full',
    rounded: 'rounded-md'
  };

  // Border classes
  const borderClasses = showBorder 
    ? 'border border-gray-200 dark:border-gray-600 shadow-sm' 
    : '';

  const baseClasses = `${sizeClasses[size]} ${shapeClasses[shape]} ${borderClasses} ${className}`;

  // If no src provided or error occurred, show enhanced fallback
  if (!src || hasError) {
    return (
      <div className="relative group">
        <div className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center ${baseClasses} transition-all duration-200 group-hover:shadow-md`}>
          <span className="text-xs text-gray-600 dark:text-gray-300 font-semibold">
            {fallbackText.split(' ').map(word => word[0]).join('').toUpperCase()}
          </span>
        </div>
        
        {/* Documentation button */}
        {notionDocUrl && (
          <button
            onClick={handleDocumentClick}
            className="absolute -top-1 -right-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
            title="Voir la documentation"
          >
            <DocumentTextIcon className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative group">
      {isLoading && (
        <div className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center ${baseClasses}`}>
          <div className="animate-pulse">
            <div className="h-3 w-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={`${baseClasses} object-contain bg-white dark:bg-gray-800 transition-all duration-200 group-hover:shadow-md group-hover:scale-105 ${isLoading ? 'hidden' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />

      {/* Documentation button */}
      {notionDocUrl && !isLoading && (
        <button
          onClick={handleDocumentClick}
          className="absolute -top-1 -right-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg transform hover:scale-110"
          title="Voir la documentation d'installation"
        >
          <DocumentTextIcon className="h-3 w-3" />
        </button>
      )}

      {/* Hover overlay for better UX */}
      <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-md pointer-events-none"></div>
    </div>
  );
};

export default EnhancedLogo;
