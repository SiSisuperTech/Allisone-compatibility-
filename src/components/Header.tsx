import { useState } from 'react';
import { Menu, X } from 'lucide-react';

type ViewType = 'checker' | 'matrix' | 'admin';

interface HeaderProps {
  currentView?: ViewType;
  onViewChange?: (view: ViewType) => void;
}

const Header = ({ currentView = 'checker', onViewChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (view: ViewType) => {
    if (onViewChange) {
      onViewChange(view);
    }
    setIsMenuOpen(false);
  };

  const navItems: { id: ViewType; label: string }[] = [
    { id: 'checker', label: 'Compatibility Checker' },
    { id: 'matrix', label: 'Matrix' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-30 transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img src="/logo.png" alt="Allisone AI Logo" className="h-12 w-auto mr-4"/>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`transition-colors ${
                      currentView === item.id 
                        ? 'text-blue-600 dark:text-blue-400 font-medium' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2 transition-colors ${
                    currentView === item.id 
                      ? 'text-blue-600 dark:text-blue-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
