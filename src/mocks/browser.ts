import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * Configuration du worker MSW pour le navigateur
 * Intercepte les requêtes réseau et retourne des réponses mockées
 */
export const worker = setupWorker(...handlers);

/**
 * Démarre le worker MSW
 * À appeler uniquement en développement
 */
export const startMocking = async () => {
  if (typeof window === 'undefined') {
    return;
  }

  return worker.start({
    onUnhandledRequest: 'bypass', // Laisse passer les requêtes non mockées
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
};
