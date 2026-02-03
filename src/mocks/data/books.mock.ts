import type { Book } from '@/types/book.types';

/**
 * Données mockées pour les livres
 */
export const mockBooks: Book[] = [
  {
    key: '/works/OL45804W',
    title: 'Le Petit Prince',
    author_name: ['Antoine de Saint-Exupéry'],
    author_key: ['/authors/OL113555A'],
    first_publish_year: 1943,
    cover_i: 7896786,
    edition_count: 1234,
    language: ['fre'],
    publisher: ['Gallimard'],
    subject: ['Fiction', 'Littérature française', 'Enfance', 'Philosophie'],
  },
  {
    key: '/works/OL45883W',
    title: '1984',
    author_name: ['George Orwell'],
    author_key: ['/authors/OL118077A'],
    first_publish_year: 1949,
    cover_i: 8229037,
    edition_count: 987,
    language: ['eng'],
    publisher: ['Secker & Warburg'],
    subject: ['Dystopia', 'Science Fiction', 'Political Fiction'],
  },
  {
    key: '/works/OL82563W',
    title: "Harry Potter à l'école des sorciers",
    author_name: ['J.K. Rowling'],
    author_key: ['/authors/OL23919A'],
    first_publish_year: 1997,
    cover_i: 10521270,
    edition_count: 456,
    language: ['fre', 'eng'],
    publisher: ['Gallimard Jeunesse'],
    subject: ['Fantasy', 'Magic', 'Young Adult'],
  },
  {
    key: '/works/OL27258W',
    title: "L'Étranger",
    author_name: ['Albert Camus'],
    author_key: ['/authors/OL124171A'],
    first_publish_year: 1942,
    cover_i: 8668482,
    edition_count: 678,
    language: ['fre'],
    publisher: ['Gallimard'],
    subject: ['Fiction', 'Existentialisme', 'Philosophie', 'Absurde'],
  },
  {
    key: '/works/OL16684924W',
    title: 'The Great Gatsby',
    author_name: ['F. Scott Fitzgerald'],
    author_key: ['/authors/OL26320A'],
    first_publish_year: 1925,
    cover_i: 7222968,
    edition_count: 543,
    language: ['eng'],
    publisher: ['Charles Scribner\'s Sons'],
    subject: ['Classic', 'American Literature', 'Jazz Age'],
  },
];

export const mockBookDetail = {
  key: '/works/OL45804W',
  title: 'Le Petit Prince',
  authors: [
    {
      author: { key: '/authors/OL113555A' },
      type: { key: '/type/author_role' },
    },
  ],
  description: {
    type: '/type/text',
    value: "Le Petit Prince est une œuvre de langue française, la plus connue d'Antoine de Saint-Exupéry. Publié à New York en 1943, c'est un conte philosophique et poétique sous l'apparence d'un conte pour enfants.",
  },
  covers: [7896786],
  subjects: [
    'Fiction',
    'Littérature française',
    'Enfance',
    'Philosophie',
    'Amitié',
    'Voyages',
  ],
  subject_places: ['Sahara', 'Astéroïde B612'],
  first_publish_date: '1943',
  publish_date: '1943',
  publishers: ['Gallimard'],
  isbn_10: ['2070408507'],
  isbn_13: ['9782070408504'],
  number_of_pages: 96,
};

export const mockAuthor = {
  key: '/authors/OL113555A',
  name: 'Antoine de Saint-Exupéry',
  birth_date: '29 juin 1900',
  death_date: '31 juillet 1944',
  bio: {
    type: '/type/text',
    value: "Antoine de Saint-Exupéry, né le 29 juin 1900 à Lyon et disparu en vol le 31 juillet 1944 au large des côtes marseillaises, est un écrivain, poète, aviateur et reporter français. Il est principalement connu pour son roman Le Petit Prince, publié en 1943 à New York.",
  },
  photographs: [6896935],
  links: [
    {
      url: 'https://fr.wikipedia.org/wiki/Antoine_de_Saint-Exup%C3%A9ry',
      title: 'Wikipedia',
    },
  ],
};

export const mockRecentChanges = {
  numFound: 100,
  start: 0,
  docs: mockBooks.slice(0, 6),
};
