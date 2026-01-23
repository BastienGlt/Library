import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { themeAtom } from '@/store/theme';

/**
 * Hook pour initialiser et synchroniser le thème avec le DOM
 */
export const useTheme = () => {
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    // Appliquer la classe dark au document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return theme;
};
