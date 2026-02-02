import { Link } from "react-router";
import { SearchBar } from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LibraryBig } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-[75rem] mx-auto px-6 md:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row items-center gap-4 py-4 md:py-0">
          <div className="flex items-center justify-between w-full md:w-auto md:h-20">
            <Link 
              to="/" 
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity flex items-center"
            >
              <LibraryBig className="w-8 h-8 mr-2 text-indigo-600 dark:text-indigo-400" style={{ color: 'rgb(79, 70, 229)' }} />
              Library
            </Link>
            
            <nav className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Accueil
              </Link>
              <Link 
                to="/search" 
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Recherche
              </Link>
            </nav>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <SearchBar placeholder="Recherche rapide..." compact />
          </div>
          
          <nav className="hidden md:flex items-center gap-4">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Accueil
            </Link>
            <Link 
              to="/search" 
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Recherche
            </Link>
            <ThemeToggle />
          </nav>

          <div className="w-full md:hidden">
            <SearchBar placeholder="Recherche rapide..." compact />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
