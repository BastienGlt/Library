import { booksHandlers } from './books.handlers';
import { wikipediaHandlers } from './wikipedia.handlers';

/**
 * Tous les handlers MSW regroupés
 */
export const handlers = [
  ...booksHandlers,
  ...wikipediaHandlers,
];
