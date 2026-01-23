import { useQuery, useQueries } from '@tanstack/react-query';
import { getBookDetail, getAuthor } from '@/services/book.service';
import { searchWikipedia } from '@/services/wikipedia.service';
import { queryKeys } from '@/lib/queryKeys';
import type { BookDetail, Author } from '@/types/book.types';
import type { WikipediaSearchResult } from '@/types/wikipedia.types';

export const useBookDetail = (bookKey: string) => {
  // Requête principale pour les détails du livre
  const { data: book, isLoading: bookLoading, error: bookError } = useQuery({
    queryKey: queryKeys.books.detail(bookKey),
    queryFn: () => getBookDetail(bookKey),
    enabled: Boolean(bookKey),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Requêtes parallèles pour les auteurs (uniquement si le livre est chargé)
  const authorQueries = useQueries({
    queries: (book?.authors ?? []).map(author => ({
      queryKey: queryKeys.authors.detail(author.author.key),
      queryFn: () => getAuthor(author.author.key),
      staleTime: 15 * 60 * 1000, // 15 minutes
      retry: 1,
    })),
  });

  // Requête Wikipedia (uniquement si le livre est chargé)
  const { data: wikiInfo } = useQuery({
    queryKey: queryKeys.wikipedia.search(book?.title ?? ''),
    queryFn: () => searchWikipedia(book!.title),
    enabled: Boolean(book?.title),
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
  });

  // Combiner les auteurs depuis les queries
  const authors = authorQueries
    .map(query => query.data)
    .filter((author): author is Author => author !== undefined && author !== null);

  const authorsLoading = authorQueries.some(query => query.isLoading);
  const loading = bookLoading || authorsLoading;

  return {
    book: book ?? null,
    authors,
    wikiInfo: wikiInfo ?? null,
    loading,
    error: bookError ? (bookError instanceof Error ? bookError.message : 'Une erreur est survenue') : null,
  };
};
