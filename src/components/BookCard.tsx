import { Link } from 'react-router';
import { getCoverUrl } from '@/services/book.service';
import type { Book } from '@/types/book.types';

export interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  const coverUrl = book.cover_i 
    ? getCoverUrl(book.cover_i, 'M')
    : 'https://via.placeholder.com/180x270?text=No+Cover';

  return (
    <Link 
      to={`/book${book.key}`}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      <div className="aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img 
          src={coverUrl} 
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {book.title}
        </h3>
        
        {book.author_name && book.author_name.length > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
            {book.author_name.join(', ')}
          </p>
        )}
        
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          {book.first_publish_year && (
            <span>{book.first_publish_year}</span>
          )}
          <span className="text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 font-medium">
            Voir détails →
          </span>
        </div>
      </div>
    </Link>
  );
};
