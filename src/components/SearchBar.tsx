import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';

export interface SearchBarProps {
  placeholder?: string;
  compact?: boolean;
  showQuickFilters?: boolean;
}

export const SearchBar = ({ 
  placeholder = 'Rechercher un livre, un auteur...', 
  compact = false,
  showQuickFilters = true 
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickSort, setQuickSort] = useState<string>('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedQuery.trim() && debouncedQuery.trim().length >= 3) {
      const params = new URLSearchParams({ q: debouncedQuery.trim() });
      if (quickSort) {
        params.append('sort', quickSort);
      }
      navigate(`/search?${params.toString()}`);
    }
  }, [debouncedQuery, quickSort, navigate]);

  return (
    <div className="w-full">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className={`w-full ${compact ? 'py-2 text-sm' : 'py-3'} px-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent transition-all`}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
            <Search />
          </div>
        </div>
        
        {showQuickFilters && !compact && (
          <select
            value={quickSort}
            onChange={(e) => setQuickSort(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">Tri : Pertinence</option>
            <option value="new">Plus récent</option>
            <option value="old">Plus ancien</option>
            <option value="random">Aléatoire</option>
          </select>
        )}
      </div>
    </div>
  );
};
