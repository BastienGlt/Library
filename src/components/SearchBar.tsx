import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      const params = new URLSearchParams({ q: searchQuery.trim() });
      if (quickSort) {
        params.append('sort', quickSort);
      }
      navigate(`/search?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className={`w-full ${compact ? 'py-2 text-sm' : 'py-3'} px-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent transition-all`}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 dark:bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
            aria-label="Rechercher"
          >
            🔍
          </button>
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
    </form>
  );
};
