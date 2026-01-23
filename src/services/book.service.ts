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
  if (params.language) searchParams.append('lang', params.language); // Note: Doc dit 'lang', pas 'language' [cite: 8]
  
  // 2. Pagination
  searchParams.append('page', String(params.page || 1));
  searchParams.append('limit', '20'); // [cite: 11]

  // 3. NOUVEAUTÉ : Tri des résultats
  // La doc permet de trier par date (new, old), aléatoire, etc. 
  if (params.sort) {
    searchParams.append('sort', params.sort);
  }

  // 4. NOUVEAUTÉ : Optimisation des champs (Fields) & Disponibilité
  // On demande uniquement les champs nécessaires pour alléger la requête[cite: 2].
  // On ajoute 'availability' pour savoir si le livre est empruntable sur Archive.org[cite: 4, 5].
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

// --- NOUVELLE FONCTION ---
// Permet de chercher par ISBN, OCLC, LCCN ou OLID via l'API Books (le "couteau suisse")[cite: 42, 53].
// C'est utile pour scanner un code-barres.
export const getBookByIdentifier = async (
  identifier: string, 
  type: 'ISBN' | 'LCCN' | 'OCLC' | 'OLID' = 'ISBN'
): Promise<any> => {
  // Format requis: "ISBN:9780980200447" [cite: 58]
  const bibKey = `${type}:${identifier}`;
  
  // jscmd=data retourne les données riches (auteurs, sujets, poids, etc.) [cite: 78, 79]
  // format=json est impératif car le défaut est du Javascript [cite: 59, 68]
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
  // L'API renvoie un objet dynamique avec la clé comme propriété, on retourne directement le livre
  return data[bibKey] || null;
};

export const getBookDetail = async (bookKey: string): Promise<BookDetail> => {
  const key = bookKey.startsWith('/') ? bookKey : `/${bookKey}`;
  // Ajout de .json à la fin [cite: 49, 50]
  const response = await fetch(`${BASE_URL}${key}.json`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du livre');
  }
  
  return response.json();
};

export const getAuthor = async (authorKey: string): Promise<Author> => {
  const key = authorKey.startsWith('/') ? authorKey : `/authors/${authorKey}`;
  // Attention: L'URL ne doit PAS contenir le nom humain, juste l'ID + .json [cite: 134, 135]
  const response = await fetch(`${BASE_URL}${key}.json`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération de l\'auteur');
  }
  
  return response.json();
};

// --- NOUVELLE FONCTION ---
// API Sujets pour explorer une thématique [cite: 136, 137]
export const getSubjectDetails = async (subject: string, details: boolean = true): Promise<SubjectResponse> => {
  // Le sujet doit être en minuscule et sans espace (souvent remplacé par _)
  const cleanSubject = subject.toLowerCase().replace(/\s+/g, '_');
  
  // details=true ajoute les auteurs prolifiques, éditeurs et sujets connexes [cite: 140, 149]
  const response = await fetch(`${BASE_URL}/subjects/${cleanSubject}.json?details=${details}`);

  if (!response.ok) {
     throw new Error('Erreur lors de la récupération du sujet');
  }

  return response.json();
};

export const getWorkEditions = async (workKey: string, limit: number = 10): Promise<WorkEditions> => {
  const workId = workKey.replace('/works/', '');
  // Récupère les éditions liées à une oeuvre [cite: 22]
  const response = await fetch(`${BASE_URL}/works/${workId}/editions.json?limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des éditions');
  }
  
  return response.json();
};

export const getAuthorWorks = async (authorKey: string, limit: number = 50): Promise<AuthorWorks> => {
  const authorId = authorKey.replace('/authors/', '');
  // Récupère les oeuvres d'un auteur [cite: 132]
  const response = await fetch(`${BASE_URL}/authors/${authorId}/works.json?limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des œuvres');
  }
  
  return response.json();
};

export const getRecentChanges = async (kind?: string, limit: number = 100): Promise<RecentChange[]> => {
  // Utilisation de bot=false pour filtrer les changements humains [cite: 188, 189]
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
  // Format standard: key/value-size.jpg [cite: 159]
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

export const getAuthorPhotoUrl = (authorId: string, size: 'S' | 'M' | 'L' = 'M'): string => {
  const id = authorId.replace('/authors/', '');
  // Format standard pour les auteurs [cite: 163]
  return `https://covers.openlibrary.org/a/olid/${id}-${size}.jpg`;
};