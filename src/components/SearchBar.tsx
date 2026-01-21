import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';

export interface SearchBarProps {
  placeholder?: string;
  compact?: boolean;
}

export const SearchBar = ({ placeholder = 'Rechercher un livre, un auteur...', compact = false }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${compact ? 'py-2 text-sm' : 'py-3'} px-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all`}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors"
          aria-label="Rechercher"
        >
          🔍
        </button>
      </div>
    </form>
  );
};
