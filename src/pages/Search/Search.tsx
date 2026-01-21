import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { SearchBar } from '@/components/SearchBar';
import { BookCard } from '@/components/BookCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useBookSearch } from '@/hooks/useBookSearch';
import type { SearchParams } from '@/types/book.types';

const Search = () => {
  const [urlParams] = useSearchParams();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: urlParams.get('q') || '',
    author: '',
    title: '',
    subject: '',
    page: 1,
  });

  const { books, loading, error, totalResults } = useBookSearch(searchParams);

  useEffect(() => {
    const queryParam = urlParams.get('q');
    if (queryParam && queryParam !== searchParams.query) {
      setSearchParams(prev => ({ ...prev, query: queryParam }));
    }
  }, [urlParams, searchParams.query]);

  const handleAdvancedSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setSearchParams({
      query: formData.get('query') as string || '',
      author: formData.get('author') as string || '',
      title: formData.get('title') as string || '',
      subject: formData.get('subject') as string || '',
      page: 1,
    });
  };

  return (
    <div className="w-full max-w-[75rem] mx-auto px-6 md:px-8 lg:px-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Recherche de livres
        </h1>
        <SearchBar />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recherche avancée
        </h2>
        
        <form onSubmit={handleAdvancedSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Le Petit Prince"
              />
            </div>
            
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Auteur
              </label>
              <input
                type="text"
                id="author"
                name="author"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Antoine de Saint-Exupéry"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Fiction, Science, Histoire..."
              />
            </div>
            
            <div>
              <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
                Mots-clés
              </label>
              <input
                type="text"
                id="query"
                name="query"
                defaultValue={searchParams.query}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Mots-clés généraux"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full md:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Rechercher
          </button>
        </form>
      </div>

      <div>
        {loading && <LoadingSpinner size="large" message="Recherche en cours..." />}
        
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && totalResults > 0 && (
          <>
            <p className="text-gray-600 mb-6">
              {totalResults} résultat{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {books.map((book) => (
                <BookCard key={book.key} book={book} />
              ))}
            </div>
          </>
        )}
        
        {!loading && !error && totalResults === 0 && searchParams.query && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              Aucun résultat trouvé pour votre recherche
            </p>
            <p className="text-gray-500">
              Essayez avec d'autres mots-clés ou utilisez la recherche avancée
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
