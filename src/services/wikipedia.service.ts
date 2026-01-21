import type { WikipediaResponse, WikipediaSearchResult } from '@/types/wikipedia.types';

const WIKIPEDIA_API_URL = 'https://fr.wikipedia.org/w/api.php';

export const searchWikipedia = async (searchTerm: string): Promise<WikipediaSearchResult | null> => {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    prop: 'extracts|pageimages',
    exintro: '1',
    explaintext: '1',
    exsentences: '3',
    piprop: 'thumbnail',
    pithumbsize: '400',
    titles: searchTerm,
    redirects: '1',
  });

  try {
    const response = await fetch(`${WIKIPEDIA_API_URL}?${params.toString()}`);
    
    if (!response.ok) {
      return null;
    }
    
    const data: WikipediaResponse = await response.json();
    
    if (!data.query?.pages) {
      return null;
    }
    
    const pages = Object.values(data.query.pages);
    const page = pages[0];
    
    if (!page || page.pageid === undefined) {
      return null;
    }
    
    return page;
  } catch (error) {
    console.error('Erreur lors de la recherche Wikipedia:', error);
    return null;
  }
};

export const getWikipediaUrl = (title: string): string => {
  return `https://fr.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
};
