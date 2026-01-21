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
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      <div className="aspect-[2/3] overflow-hidden bg-gray-100">
        <img 
          src={coverUrl} 
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {book.title}
        </h3>
        
        {book.author_name && book.author_name.length > 0 && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            {book.author_name.join(', ')}
          </p>
        )}
        
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
          {book.first_publish_year && (
            <span>{book.first_publish_year}</span>
          )}
          <span className="text-indigo-600 group-hover:text-indigo-700 font-medium">
            Voir détails →
          </span>
        </div>
      </div>
    </Link>
  );
};
