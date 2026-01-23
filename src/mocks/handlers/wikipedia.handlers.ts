import { http, HttpResponse, delay } from 'msw';

const WIKI_BASE = 'https://fr.wikipedia.org/api/rest_v1';

/**
 * Mock Wikipedia data
 */
const mockWikiData = {
  'Le_Petit_Prince': {
    type: 'standard',
    title: 'Le Petit Prince',
    displaytitle: 'Le Petit Prince',
    extract: "Le Petit Prince est une œuvre de langue française, la plus connue d'Antoine de Saint-Exupéry. Publié à New York en 1943, c'est un conte philosophique et poétique sous l'apparence d'un conte pour enfants. Le Petit Prince raconte l'histoire d'un jeune prince qui voyage de planète en planète.",
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Littleprince.JPG/320px-Littleprince.JPG',
      width: 320,
      height: 426,
    },
    originalimage: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Littleprince.JPG',
      width: 1536,
      height: 2048,
    },
  },
  '1984_(roman)': {
    type: 'standard',
    title: '1984 (roman)',
    displaytitle: '1984',
    extract: "1984 (en anglais Nineteen Eighty-Four) est un roman dystopique de l'écrivain britannique George Orwell publié en 1949. L'auteur y développe une réflexion sur la société totalitaire, sur le pouvoir et sur l'information. Il dépeint une Grande-Bretagne trente ans après une guerre nucléaire entre l'Est et l'Ouest.",
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/1984first.jpg/320px-1984first.jpg',
      width: 320,
      height: 485,
    },
  },
};

/**
 * Handlers MSW pour l'API Wikipedia
 */
export const wikipediaHandlers = [
  // GET /page/summary/:title - Résumé d'une page Wikipedia
  http.get(`${WIKI_BASE}/page/summary/:title`, async ({ params }) => {
    const { title } = params;
    await delay(200);

    const titleStr = String(title);
    const mockData = mockWikiData[titleStr as keyof typeof mockWikiData];

    if (mockData) {
      return HttpResponse.json(mockData);
    }

    // Réponse par défaut si le titre n'est pas trouvé
    return HttpResponse.json({
      type: 'standard',
      title: titleStr.replace(/_/g, ' '),
      displaytitle: titleStr.replace(/_/g, ' '),
      extract: `Ceci est un résumé mocké pour "${titleStr.replace(/_/g, ' ')}". Aucune donnée spécifique n'est disponible pour ce titre.`,
    });
  }),
];
