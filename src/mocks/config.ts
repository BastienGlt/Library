/**
 * Configuration pour activer/désactiver les mocks MSW
 * 
 * Méthodes d'activation:
 * 1. Variable d'environnement: VITE_ENABLE_MOCKS=true
 * 2. localStorage: localStorage.setItem('msw-enabled', 'true')
 * 3. URL param: ?msw=true
 */

export const isMockingEnabled = (): boolean => {
  // Vérifier la variable d'environnement
  if (import.meta.env.VITE_ENABLE_MOCKS === 'true') {
    return true;
  }

  // Vérifier localStorage
  if (typeof window !== 'undefined') {
    const localStorageValue = localStorage.getItem('msw-enabled');
    if (localStorageValue === 'true') {
      return true;
    }

    // Vérifier URL param
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('msw') === 'true') {
      // Sauvegarder dans localStorage pour les prochaines sessions
      localStorage.setItem('msw-enabled', 'true');
      return true;
    }

    if (urlParams.get('msw') === 'false') {
      localStorage.removeItem('msw-enabled');
      return false;
    }
  }

  // Par défaut, désactivé
  return false;
};

/**
 * Active les mocks MSW
 */
export const enableMocking = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('msw-enabled', 'true');
    window.location.reload();
  }
};

/**
 * Désactive les mocks MSW
 */
export const disableMocking = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('msw-enabled');
    window.location.reload();
  }
};

/**
 * Expose les fonctions dans la console pour faciliter le debug
 */
if (typeof window !== 'undefined') {
  (window as Window & typeof globalThis & { __MSW__: { enable: () => void; disable: () => void; isEnabled: () => boolean } }).__MSW__ = {
    enable: enableMocking,
    disable: disableMocking,
    isEnabled: isMockingEnabled,
  };
}
