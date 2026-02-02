import type { BookSearchResponse, BookDetail, Author, RecentChange, SearchParams, WorkEditions, AuthorWorks, SubjectResponse } from '@/types/book.types';

const BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (params: SearchParams & { sort?: 'new' | 'old' | 'random' | 'key' }): Promise<BookSearchResponse> => {
  const searchParams = new URLSearchParams();
  
  // 1. Paramètres de base
  let queryString = params.query || '';
  
  // Ajout des filtres de date dans la requête si spécifiés
  if (params.yearFrom || params.yearTo) {
    const yearFilter = [];
    if (params.yearFrom && params.yearTo) {
      yearFilter.push(`first_publish_year:[${params.yearFrom} TO ${params.yearTo}]`);
    } else if (params.yearFrom) {
      yearFilter.push(`first_publish_year:[${params.yearFrom} TO *]`);
    } else if (params.yearTo) {
      yearFilter.push(`first_publish_year:[* TO ${params.yearTo}]`);
    }
    
    if (yearFilter.length > 0) {
      queryString = queryString ? `${queryString} AND ${yearFilter.join(' AND ')}` : yearFilter.join(' AND ');
    }
  }
  
  if (queryString) searchParams.append('q', queryString);
  if (params.author) searchParams.append('author', params.author);
  if (params.title) searchParams.append('title', params.title);
  if (params.subject) searchParams.append('subject', params.subject);
  if (params.language) searchParams.append('lang', params.language);
  
  // 2. Pagination
  searchParams.append('page', String(params.page || 1));
  searchParams.append('limit', '20');

  // 3. Tri des résultats
  if (params.sort) {
    searchParams.append('sort', params.sort);
  }

  // 4. Optimisation des champs (Fields) & Disponibilité
  const fields = [
    'key', 'title', 'author_name', 'cover_i', 'edition_count', 
    'first_publish_year', 'availability'
  ].join(',');
  searchParams.append('fields', fields);

  const response = await fetch(`${BASE_URL}/search.json?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la recherche des livres');
  }
  
  return response.json();
};

export const getBookByIdentifier = async (
  identifier: string, 
  type: 'ISBN' | 'LCCN' | 'OCLC' | 'OLID' = 'ISBN'
): Promise<Record<string, unknown> | null> => {
  const bibKey = `${type}:${identifier}`;
  const params = new URLSearchParams({
    bibkeys: bibKey,
    jscmd: 'data',
    format: 'json'
  });

  const response = await fetch(`${BASE_URL}/api/books?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération par identifiant');
  }

  const data = await response.json();
  return data[bibKey] || null;
};

export const getBookDetail = async (bookKey: string): Promise<BookDetail> => {
  const key = bookKey.startsWith('/') ? bookKey : `/${bookKey}`;
  const response = await fetch(`${BASE_URL}${key}.json`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du livre');
  }
  
  return response.json();
};

export const getAuthor = async (authorKey: string): Promise<Author> => {
  const key = authorKey.startsWith('/') ? authorKey : `/authors/${authorKey}`;
  const response = await fetch(`${BASE_URL}${key}.json`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération de l\'auteur');
  }
  
  return response.json();
};

export const getSubjectDetails = async (subject: string, details: boolean = true): Promise<SubjectResponse> => {
  const cleanSubject = subject.toLowerCase().replace(/\s+/g, '_');
  
  const response = await fetch(`${BASE_URL}/subjects/${cleanSubject}.json?details=${details}`);

  if (!response.ok) {
     throw new Error('Erreur lors de la récupération du sujet');
  }

  return response.json();
};

export const getWorkEditions = async (workKey: string, limit: number = 10): Promise<WorkEditions> => {
  const workId = workKey.replace('/works/', '');
  const response = await fetch(`${BASE_URL}/works/${workId}/editions.json?limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des éditions');
  }
  
  return response.json();
};

export const getAuthorWorks = async (authorKey: string, limit: number = 50): Promise<AuthorWorks> => {
  const authorId = authorKey.replace('/authors/', '');
  const response = await fetch(`${BASE_URL}/authors/${authorId}/works.json?limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des œuvres');
  }
  
  return response.json();
};

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

export const getCoverUrl = (coverId: number, size: 'S' | 'M' | 'L' = 'M'): string => {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

export const getAuthorPhotoUrl = (authorId: string, size: 'S' | 'M' | 'L' = 'M'): string => {
  const id = authorId.replace('/authors/', '');
  return `https://covers.openlibrary.org/a/olid/${id}-${size}.jpg`;
};