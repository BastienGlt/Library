/**
 * Clés de requêtes centralisées pour TanStack Query
 * Facilite la gestion du cache et l'invalidation
 */

import type { SearchParams } from '@/types/book.types';

export const queryKeys = {
  // Livres
  books: {
    all: ['books'] as const,
    search: (params: SearchParams) => ['books', 'search', params] as const,
    detail: (bookKey: string) => ['book', bookKey] as const,
  },
  
  // Auteurs
  authors: {
    all: ['authors'] as const,
    detail: (authorKey: string) => ['author', authorKey] as const,
  },
  
  // Wikipedia
  wikipedia: {
    search: (title: string) => ['wikipedia', title] as const,
  },
  
  // Changements récents
  recentChanges: {
    all: ['recentChanges'] as const,
  },
} as const;
