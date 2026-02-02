import { useAtom, useAtomValue } from 'jotai';
import { toggleThemeAtom, isDarkModeAtom } from '@/store/theme';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const isDark = useAtomValue(isDarkModeAtom);
  const [, toggleTheme] = useAtom(toggleThemeAtom);

  return (
    <button
      onClick={() => toggleTheme()}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};
