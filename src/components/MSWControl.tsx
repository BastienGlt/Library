import { useState } from 'react';
import { isMockingEnabled, enableMocking, disableMocking } from '@/mocks/config';

/**
 * Composant de contrôle MSW (Mock Service Worker)
 * Permet d'activer/désactiver les mocks depuis l'interface
 */
export const MSWControl = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isEnabled = isMockingEnabled();

  const handleToggle = () => {
    if (isEnabled) {
      disableMocking();
    } else {
      enableMocking();
    }
  };

  // En production, ne pas afficher ce composant
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-[9999]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-semibold"
          title="MSW Controls"
        >
          🔧 MSW
          {isEnabled && <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>}
        </button>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 border border-gray-200 dark:border-gray-700 min-w-[300px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              🔧 Mock Service Worker
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl leading-none"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  État actuel
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isEnabled ? 'Mocks activés' : 'API réelle'}
                </p>
              </div>
              <div className={`w-3 h-3 rounded-full ${isEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            </div>

            <button
              onClick={handleToggle}
              className={`w-full px-4 py-3 rounded-lg font-semibold transition-all ${
                isEnabled
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isEnabled ? '🔴 Désactiver les mocks' : '🟢 Activer les mocks'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
