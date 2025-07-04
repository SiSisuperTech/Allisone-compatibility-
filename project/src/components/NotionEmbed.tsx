import React, { useState, useEffect } from 'react';
import { ArrowTopRightOnSquareIcon, DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface NotionEmbedProps {
  notionUrl?: string;
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
}

const NotionEmbed: React.FC<NotionEmbedProps> = ({ 
  notionUrl, 
  title = "Installation Guide", 
  description = "Documentation détaillée",
  isOpen,
  onClose
}) => {
  const [embedUrl, setEmbedUrl] = useState<string>('');

  useEffect(() => {
    if (notionUrl) {
      // Convert Notion URL to embed format
      // Example: https://notion.so/page-id -> https://notion.so/embed/page-id
      const convertToEmbedUrl = (url: string) => {
        if (url.includes('/embed/')) return url;
        
        // Extract page ID from various Notion URL formats
        const pageIdMatch = url.match(/([a-f0-9]{32}|[a-f0-9-]{36})/);
        if (pageIdMatch) {
          const pageId = pageIdMatch[1];
          return `https://www.notion.so/embed/${pageId}`;
        }
        
        return url;
      };
      
      setEmbedUrl(convertToEmbedUrl(notionUrl));
    }
  }, [notionUrl]);

  if (!isOpen || !notionUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href={notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              title="Ouvrir dans Notion"
            >
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              title="Fermer"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Notion Embed */}
        <div className="flex-1 overflow-hidden">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              title="Notion Documentation"
              allow="clipboard-read; clipboard-write"
              style={{ minHeight: '500px' }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Chargement de la documentation...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Documentation mise à jour en temps réel
            </span>
            <a
              href={notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center space-x-1"
            >
              <span>Ouvrir dans Notion</span>
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionEmbed;
