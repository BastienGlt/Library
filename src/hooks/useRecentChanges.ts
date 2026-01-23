import { useQuery } from '@tanstack/react-query';
import { getRecentChanges, getBookDetail } from '@/services/book.service';
import { queryKeys } from '@/lib/queryKeys';
import type { Book } from '@/types/book.types';

export const useRecentChanges = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.recentChanges.all,
    queryFn: async () => {
      // Utiliser l'API RecentChanges avec le filtre 'add-book' pour obtenir uniquement les nouveaux livres
      const changes = await getRecentChanges('add-book', 50);
      
      // Extraire les clés de livres depuis les changements
      const bookKeys = new Set<string>();
      
      changes.forEach(change => {
        if (change.changes && Array.isArray(change.changes)) {
          change.changes.forEach(item => {
            if (item.key && typeof item.key === 'string' && 
                (item.key.startsWith('/books/') || item.key.startsWith('/works/'))) {
              bookKeys.add(item.key);
            }
          });
        }
      });

      // Limiter à 12 livres
      const limitedKeys = Array.from(bookKeys).slice(0, 12);

      // Récupérer les détails des livres
      const bookPromises = limitedKeys.map(key => 
        getBookDetail(key)
          .then(detail => ({
            key: detail.key,
            title: detail.title,
            author_name: [] as string[],
            cover_i: detail.covers?.[0],
            first_publish_year: detail.publish_date ? 
              parseInt(detail.publish_date.match(/\d{4}/)?.[0] || '0') : undefined,
          }))
          .catch(() => null)
      );

      const booksData = await Promise.all(bookPromises);
      return booksData.filter((b): b is NonNullable<typeof b> => b !== null) as Book[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });

  return {
    books: data ?? [],
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Une erreur est survenue') : null,
  };
};
