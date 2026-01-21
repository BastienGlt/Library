import { useState, useEffect } from 'react';
import { searchBooks } from '@/services/book.service';
import type { Book, SearchParams } from '@/types/book.types';

export const useBookSearch = (params: SearchParams) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);

  useEffect(() => {
    const fetchBooks = async (): Promise<void> => {
      if (!params.query && !params.author && !params.title && !params.subject) {
        setBooks([]);
        setTotalResults(0);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchBooks(params);
        setBooks(response.docs);
        setTotalResults(response.numFound);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [params.query, params.author, params.title, params.subject, params.publisher, params.language, params.page]);

  return { books, loading, error, totalResults };
};
