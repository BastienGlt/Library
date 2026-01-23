import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Type pour le thème
export type Theme = 'light' | 'dark';

// Atom avec persistance dans localStorage
export const themeAtom = atomWithStorage<Theme>('library-theme', 'light');

// Atom dérivé pour vérifier si le mode sombre est actif
export const isDarkModeAtom = atom(
  (get) => get(themeAtom) === 'dark'
);

// Atom pour toggler le thème
export const toggleThemeAtom = atom(
  null,
  (get, set) => {
    const currentTheme = get(themeAtom);
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    set(themeAtom, newTheme);
    
    // Mettre à jour la classe sur le document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
);
