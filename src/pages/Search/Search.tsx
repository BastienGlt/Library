import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Search as SearchIcon, ListFilter, BookSearch } from 'lucide-react';
import { BookCard } from '@/components/BookCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Pagination } from '@/components/Pagination';
import { useBookSearch } from '@/hooks/useBookSearch';
import type { SearchParams } from '@/types/book.types';

const Search = () => {
  const [urlParams] = useSearchParams();
  const [searchParams, setSearchParams] = useState<SearchParams>(() => ({
    query: urlParams.get('q') || '',
    author: '',
    title: '',
    subject: '',
    page: 1,
    sort: (urlParams.get('sort') as 'new' | 'old' | 'random' | 'key') || undefined,
    yearFrom: undefined,
    yearTo: undefined,
  }));
  
  // États temporaires pour les filtres (non appliqués)
  const [tempFilters, setTempFilters] = useState({
    sort: searchParams.sort || '',
    yearFrom: searchParams.yearFrom || '',
    yearTo: searchParams.yearTo || '',
    language: searchParams.language || '',
  });

  const { books, loading, error, totalResults } = useBookSearch(searchParams);

  const handleAdvancedSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setSearchParams(prev => ({
      ...prev,
      query: formData.get('query') as string || '',
      author: formData.get('author') as string || '',
      title: formData.get('title') as string || '',
      subject: formData.get('subject') as string || '',
      page: 1,
    }));
  };
  
  const handleApplyFilters = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const yearFrom = formData.get('yearFrom') as string;
    const yearTo = formData.get('yearTo') as string;
    const sort = formData.get('sort') as string;
    
    setSearchParams(prev => ({
      ...prev,
      sort: sort as 'new' | 'old' | 'random' | 'key' || undefined,
      yearFrom: yearFrom ? parseInt(yearFrom, 10) : undefined,
      yearTo: yearTo ? parseInt(yearTo, 10) : undefined,
      language: formData.get('language') as string || '',
      page: 1,
    }));
    
    setTempFilters({
      sort: sort || '',
      yearFrom: yearFrom || '',
      yearTo: yearTo || '',
      language: formData.get('language') as string || '',
    });
  };

  const handlePageChange = (page: number): void => {
    setSearchParams(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-[90rem] mx-auto px-6 md:px-8 lg:px-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          <BookSearch className="w-10 h-10 inline-block mr-2 text-indigo-600 dark:text-indigo-400" />
          Recherche de livres
        </h1>
      </div>

      {/* Layout avec 3 colonnes */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar gauche - Recherche avancée */}
        <aside className="lg:w-64 xl:w-80 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <SearchIcon className="w-5 h-5" />
              Recherche avancée
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Recherchez par critères spécifiques
            </p>
            
            <form onSubmit={handleAdvancedSearch} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={searchParams.title}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500"
                    placeholder="Le Petit Prince"
                  />
                </div>
                
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Auteur
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    defaultValue={searchParams.author}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500"
                    placeholder="Antoine de Saint-Exupéry"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    defaultValue={searchParams.subject}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500"
                    placeholder="Fiction, Science..."
                  />
                </div>
                
                <div>
                  <label htmlFor="query" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mots-clés
                  </label>
                  <input
                    type="text"
                    id="query"
                    name="query"
                    defaultValue={searchParams.query}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500"
                    placeholder="Mots-clés généraux"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors font-semibold cursor-pointer"
              >
                Rechercher
              </button>
            </form>
          </div>
        </aside>

        {/* Contenu principal - Résultats */}
        <main className="flex-1 min-w-0">
          <div>
            {loading && <LoadingSpinner size="large" message="Recherche en cours..." />}
            
            {error && <ErrorMessage message={error} />}
            
            {/* Affichage des filtres actifs */}
            {!loading && !error && totalResults > 0 && (
              <>
                {/* Critères de recherche actifs */}
                {(searchParams.query || searchParams.author || searchParams.title || searchParams.subject) && (
                  <div className="mb-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <h3 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
                      <SearchIcon className="w-5 h-5 inline-block mr-2" />
                      Critères de recherche actifs
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {searchParams.query && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-indigo-300 dark:border-indigo-700 font-medium">
                          Mots-clés : {searchParams.query}
                        </span>
                      )}
                      {searchParams.title && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-indigo-300 dark:border-indigo-700 font-medium">
                          Titre : {searchParams.title}
                        </span>
                      )}
                      {searchParams.author && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-indigo-300 dark:border-indigo-700 font-medium">
                          Auteur : {searchParams.author}
                        </span>
                      )}
                      {searchParams.subject && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-indigo-300 dark:border-indigo-700 font-medium">
                          Sujet : {searchParams.subject}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Filtres actifs */}
                {(searchParams.sort || searchParams.yearFrom || searchParams.yearTo || searchParams.language) && (
                  <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-300 mb-2">
                      <ListFilter className="w-5 h-5 inline-block mr-2" /> 
                      Filtres appliqués
                      </h3>
                    <div className="flex flex-wrap gap-2">
                      {searchParams.sort && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-emerald-300 dark:border-emerald-700 font-medium">
                          Tri : {searchParams.sort === 'new' ? 'Plus récent' : searchParams.sort === 'old' ? 'Plus ancien' : searchParams.sort === 'random' ? 'Aléatoire' : 'Par clé'}
                        </span>
                      )}
                      {(searchParams.yearFrom || searchParams.yearTo) && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-emerald-300 dark:border-emerald-700 font-medium">
                          Années : {searchParams.yearFrom || '...'} - {searchParams.yearTo || '...'}
                        </span>
                      )}
                      {searchParams.language && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-emerald-300 dark:border-emerald-700 font-medium">
                          Langue : {searchParams.language}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {totalResults} résultat{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                  {books.map((book) => (
                    <BookCard key={book.key} book={book} />
                  ))}
                </div>
                
                {/* Pagination */}
                <Pagination
                  currentPage={searchParams.page || 1}
                  totalResults={totalResults}
                  resultsPerPage={20}
                  onPageChange={handlePageChange}
                />
              </>
            )}
            
            {!loading && !error && totalResults === 0 && searchParams.query && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                  Aucun résultat trouvé pour votre recherche
                </p>
                <p className="text-gray-500 dark:text-gray-500">
                  Essayez avec d'autres mots-clés ou utilisez la recherche avancée
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Sidebar droite - Filtres */}
        <aside className="lg:w-64 xl:w-80 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <ListFilter className="w-5 h-5" />
              Filtres
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Affinez vos résultats
            </p>
            
            <form onSubmit={handleApplyFilters} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Trier par
                  </label>
                  <select
                    id="sort"
                    name="sort"
                    value={tempFilters.sort}
                    onChange={(e) => setTempFilters(prev => ({ ...prev, sort: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="">Pertinence</option>
                    <option value="new">Plus récent</option>
                    <option value="old">Plus ancien</option>
                    <option value="random">Aléatoire</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="yearFrom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Année min
                  </label>
                  <input
                    type="number"
                    id="yearFrom"
                    name="yearFrom"
                    value={tempFilters.yearFrom}
                    onChange={(e) => setTempFilters(prev => ({ ...prev, yearFrom: e.target.value }))}
                    min="1000"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500"
                    placeholder="ex: 1900"
                  />
                </div>

                <div>
                  <label htmlFor="yearTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Année max
                  </label>
                  <input
                    type="number"
                    id="yearTo"
                    name="yearTo"
                    value={tempFilters.yearTo}
                    onChange={(e) => setTempFilters(prev => ({ ...prev, yearTo: e.target.value }))}
                    min="1000"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500"
                    placeholder="ex: 2024"
                  />
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Langue
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={tempFilters.language}
                    onChange={(e) => setTempFilters(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="">Toutes</option>
                    <option value="fre">Français</option>
                    <option value="eng">Anglais</option>
                    <option value="spa">Espagnol</option>
                    <option value="ger">Allemand</option>
                    <option value="ita">Italien</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 dark:bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-semibold cursor-pointer"
                >
                  Appliquer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTempFilters({ sort: '', yearFrom: '', yearTo: '', language: '' });
                    setSearchParams(prev => ({
                      ...prev,
                      sort: undefined,
                      yearFrom: undefined,
                      yearTo: undefined,
                      language: '',
                    }));
                  }}
                  className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium cursor-pointer"
                >
                  Réinitialiser
                </button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Search;
