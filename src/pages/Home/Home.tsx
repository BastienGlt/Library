import { Hero } from '@/components/Hero';
import { BookCard } from '@/components/BookCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/Button';
import { useRecentChanges } from '@/hooks/useRecentChanges';
import { Link } from 'react-router';
import { CircleFadingPlus } from 'lucide-react';

const Home = () => {
  const { books, loading, error } = useRecentChanges();

  return (
    <div className="w-full max-w-[75rem] mx-auto px-6 md:px-8 lg:px-10">
      <Hero
        title="Library"
        subtitle="Découvrez notre collection de livres et explorez les derniers ajouts"
      />

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            <CircleFadingPlus className="w-8 h-8 inline-block mr-2 text-indigo-600 dark:text-indigo-400" />
            Derniers livres ajoutés
          </h2>
          <Link to="/search">
            <Button variant="secondary">
              Recherche avancée
            </Button>
          </Link>
        </div>

        {loading && <LoadingSpinner size="large" message="Chargement des livres..." />}
        
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && books.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {books.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>
        )}

        {!loading && !error && books.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400 py-12">
            Aucun livre récent trouvé
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
