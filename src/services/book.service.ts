import type { BookSearchResponse, BookDetail, Author, RecentChange, SearchParams, WorkEditions, AuthorWorks } from '@/types/book.types';

const BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (params: SearchParams): Promise<BookSearchResponse> => {
  const searchParams = new URLSearchParams();
  
  if (params.query) searchParams.append('q', params.query);
  if (params.author) searchParams.append('author', params.author);
  if (params.title) searchParams.append('title', params.title);
  if (params.subject) searchParams.append('subject', params.subject);
  if (params.publisher) searchParams.append('publisher', params.publisher);
  if (params.language) searchParams.append('language', params.language);
  
  searchParams.append('page', String(params.page || 1));
  searchParams.append('limit', '20');

  const response = await fetch(`${BASE_URL}/search.json?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la recherche des livres');
  }
  
  return response.json();
};

// Récupérer les détails d'un livre ou d'un work
// Selon la doc: /books/OL1M.json ou /works/OL27258W.json
export const getBookDetail = async (bookKey: string): Promise<BookDetail> => {
  // S'assurer que la clé est au bon format
  const key = bookKey.startsWith('/') ? bookKey : `/${bookKey}`;
  const response = await fetch(`${BASE_URL}${key}.json`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du livre');
  }
  
  return response.json();
};

// Récupérer les détails d'un auteur
// Selon la doc: /authors/OL1A.json
export const getAuthor = async (authorKey: string): Promise<Author> => {
  // S'assurer que la clé est au bon format
  const key = authorKey.startsWith('/') ? authorKey : `/authors/${authorKey}`;
  const response = await fetch(`${BASE_URL}${key}.json`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération de l\'auteur');
  }
  
  return response.json();
};

// Récupérer les éditions d'un work
// Selon la doc: /works/OL27258W/editions.json
export const getWorkEditions = async (workKey: string, limit: number = 10): Promise<WorkEditions> => {
  // Extraire l'ID du work
  const workId = workKey.replace('/works/', '');
  const response = await fetch(`${BASE_URL}/works/${workId}/editions.json?limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des éditions');
  }
  
  return response.json();
};

// Récupérer les works d'un auteur
// Selon la doc: /authors/OL1A/works.json
export const getAuthorWorks = async (authorKey: string, limit: number = 50): Promise<AuthorWorks> => {
  // Extraire l'ID de l'auteur
  const authorId = authorKey.replace('/authors/', '');
  const response = await fetch(`${BASE_URL}/authors/${authorId}/works.json?limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des œuvres');
  }
  
  return response.json();
};

// Récupérer les changements récents
// Selon la doc: /recentchanges.json avec paramètres type, limit, offset
// Types disponibles: add-book, edit-book, add-cover, merge-authors, etc.
export const getRecentChanges = async (kind?: string, limit: number = 100): Promise<RecentChange[]> => {
  const url = kind 
    ? `${BASE_URL}/recentchanges/${kind}.json?limit=${limit}&bot=false`
    : `${BASE_URL}/recentchanges.json?limit=${limit}&bot=false`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des changements récents');
  }
  
  return response.json();
};

// URL des couvertures de livres
export const getCoverUrl = (coverId: number, size: 'S' | 'M' | 'L' = 'M'): string => {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

// URL des photos d'auteurs
export const getAuthorPhotoUrl = (authorId: string, size: 'S' | 'M' | 'L' = 'M'): string => {
  const id = authorId.replace('/authors/', '');
  return `https://covers.openlibrary.org/a/olid/${id}-${size}.jpg`;
};
