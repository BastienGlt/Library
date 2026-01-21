import { useState, useEffect } from 'react';
import { getBookDetail, getAuthor } from '@/services/book.service';
import { searchWikipedia } from '@/services/wikipedia.service';
import type { BookDetail, Author } from '@/types/book.types';
import type { WikipediaSearchResult } from '@/types/wikipedia.types';

export const useBookDetail = (bookKey: string) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [wikiInfo, setWikiInfo] = useState<WikipediaSearchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetail = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const bookData = await getBookDetail(bookKey);
        setBook(bookData);

        // Récupérer les auteurs
        if (bookData.authors && bookData.authors.length > 0) {
          const authorPromises = bookData.authors.map(a => 
            getAuthor(a.author.key).catch(() => null)
          );
          const authorsData = await Promise.all(authorPromises);
          setAuthors(authorsData.filter((a): a is Author => a !== null));
        }

        // Rechercher sur Wikipedia
        if (bookData.title) {
          const wikiData = await searchWikipedia(bookData.title);
          setWikiInfo(wikiData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    if (bookKey) {
      fetchBookDetail();
    }
  }, [bookKey]);

  return { book, authors, wikiInfo, loading, error };
};
