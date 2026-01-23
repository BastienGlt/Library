import { useQuery } from '@tanstack/react-query';
import { searchBooks } from '@/services/book.service';
import { queryKeys } from '@/lib/queryKeys';
import type { SearchParams } from '@/types/book.types';

export const useBookSearch = (params: SearchParams) => {
  // Vérifier si au moins un critère de recherche est présent
  const hasSearchCriteria = Boolean(
    params.query || params.author || params.title || params.subject
  );

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.books.search(params),
    queryFn: () => searchBooks(params),
    enabled: hasSearchCriteria,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });

  return {
    books: data?.docs ?? [],
    totalResults: data?.numFound ?? 0,
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Une erreur est survenue') : null,
  };
};
