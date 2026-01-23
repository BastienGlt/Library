import { http, HttpResponse, delay } from 'msw';
import { mockBooks, mockBookDetail, mockAuthor, mockRecentChanges } from '../data/books.mock';

const API_BASE = 'https://openlibrary.org';

/**
 * Handlers MSW pour l'API Open Library
 */
export const booksHandlers = [
  // GET /search.json - Recherche de livres
  http.get(`${API_BASE}/search.json`, async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const title = url.searchParams.get('title');
    const author = url.searchParams.get('author');
    const subject = url.searchParams.get('subject');
    const sort = url.searchParams.get('sort');

    // Simuler un délai réseau
    await delay(300);

    // Filtrer les livres selon les paramètres
    let filteredBooks = [...mockBooks];

    if (query) {
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author_name?.some(a => a.toLowerCase().includes(query.toLowerCase()))
      );
    }

    if (title) {
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (author) {
      filteredBooks = filteredBooks.filter(book =>
        book.author_name?.some(a => a.toLowerCase().includes(author.toLowerCase()))
      );
    }

    if (subject) {
      filteredBooks = filteredBooks.filter(book =>
        book.subject?.some(s => s.toLowerCase().includes(subject.toLowerCase()))
      );
    }

    // Tri
    if (sort === 'new') {
      filteredBooks.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    } else if (sort === 'old') {
      filteredBooks.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
    } else if (sort === 'random') {
      filteredBooks.sort(() => Math.random() - 0.5);
    }

    return HttpResponse.json({
      numFound: filteredBooks.length,
      start: 0,
      numFoundExact: true,
      docs: filteredBooks,
    });
  }),

  // GET /works/:workId.json - Détails d'une œuvre
  http.get(`${API_BASE}/works/:workId.json`, async () => {
    await delay(200);
    return HttpResponse.json(mockBookDetail);
  }),

  // GET /books/:editionId.json - Détails d'une édition
  http.get(`${API_BASE}/books/:editionId.json`, async () => {
    await delay(200);
    return HttpResponse.json(mockBookDetail);
  }),

  // GET /authors/:authorId.json - Détails d'un auteur
  http.get(`${API_BASE}/authors/:authorId.json`, async () => {
    await delay(150);
    return HttpResponse.json(mockAuthor);
  }),

  // GET /recentchanges.json - Changements récents
  http.get(`${API_BASE}/recentchanges.json`, async () => {
    await delay(250);
    return HttpResponse.json(mockRecentChanges);
  }),

  // Simuler une erreur réseau (décommenter pour tester)
  // http.get(`${API_BASE}/search.json`, async () => {
  //   await delay(500);
  //   return HttpResponse.json(
  //     { error: 'Service temporairement indisponible' },
  //     { status: 503 }
  //   );
  // }),
];
