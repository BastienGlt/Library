import { useParams, Link } from 'react-router';
import { useBookDetail } from '@/hooks/useBookDetail';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { getCoverUrl } from '@/services/book.service';
import { getWikipediaUrl } from '@/services/wikipedia.service';
import { Button } from '@/components/Button';

const BookDetail = () => {
  const { workId, editionId } = useParams<{ workId?: string; editionId?: string }>();
  const bookKey = editionId ? `/books/${editionId}` : `/works/${workId}`;
  
  const { book, authors, wikiInfo, loading, error } = useBookDetail(bookKey);

  if (loading) {
    return (
      <div className="w-full max-w-[75rem] mx-auto px-6 md:px-8 lg:px-10">
        <LoadingSpinner size="large" message="Chargement du livre..." />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="w-full max-w-[75rem] mx-auto px-6 md:px-8 lg:px-10">
        <ErrorMessage message={error || 'Livre introuvable'} />
        <div className="mt-6 text-center">
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  const coverUrl = book.covers?.[0] 
    ? getCoverUrl(book.covers[0], 'L')
    : 'https://via.placeholder.com/300x450?text=No+Cover';

  const description = typeof book.description === 'string' 
    ? book.description 
    : book.description?.value || 'Aucune description disponible.';

  return (
    <div className="w-full max-w-[75rem] mx-auto px-6 md:px-8 lg:px-10">
      <Link to="/" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-6">
        ← Retour
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden sticky top-24">
            <img 
              src={coverUrl} 
              alt={book.title}
              className="w-full"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {book.title}
            </h1>

            {authors.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Auteur{authors.length > 1 ? 's' : ''}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {authors.map(author => author.name).join(', ')}
                </p>
              </div>
            )}

            {book.publish_date && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Date de publication
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{book.publish_date}</p>
              </div>
            )}

            {book.publishers && book.publishers.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Éditeur{book.publishers.length > 1 ? 's' : ''}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{book.publishers.join(', ')}</p>
              </div>
            )}

            {book.number_of_pages && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Nombre de pages
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{book.number_of_pages}</p>
              </div>
            )}

            {(book.isbn_10 || book.isbn_13) && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  ISBN
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {book.isbn_13?.[0] || book.isbn_10?.[0]}
                </p>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>

            {book.subjects && book.subjects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Sujets
                </h2>
                <div className="flex flex-wrap gap-2">
                  {book.subjects.slice(0, 10).map((subject, index) => (
                    <span 
                      key={index}
                      className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {wikiInfo && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-lg p-6 md:p-8 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📖</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Informations Wikipédia
                </h2>
              </div>

              {wikiInfo.thumbnail && (
                <img 
                  src={wikiInfo.thumbnail.source} 
                  alt={wikiInfo.title}
                  className="w-full max-w-md rounded-lg shadow-md mb-4"
                />
              )}

              {wikiInfo.extract && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {wikiInfo.extract}
                </p>
              )}

              <a
                href={getWikipediaUrl(wikiInfo.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-semibold"
              >
                Voir sur Wikipédia →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
