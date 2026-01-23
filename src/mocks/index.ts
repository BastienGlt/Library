/**
 * Point d'entrée pour les mocks MSW
 * 
 * Utilisation:
 * - En développement: Les mocks peuvent être activés/désactivés via une variable d'environnement
 * - En tests: Les mocks sont automatiquement utilisés
 */

export { worker, startMocking } from './browser';
export { handlers } from './handlers';
export * from './data/books.mock';
