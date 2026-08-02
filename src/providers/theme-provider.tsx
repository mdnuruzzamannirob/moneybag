'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';

export type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = Exclude<Theme, 'system'>;

type ThemeContextValue = {
  resolvedTheme: ResolvedTheme;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): Theme {
  const storedTheme = window.localStorage.getItem('moneybag-theme');
  return storedTheme === 'dark' || storedTheme === 'light' || storedTheme === 'system'
    ? storedTheme
    : 'system';
}

function subscribeToStoredTheme(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === 'moneybag-theme') callback();
  };
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function subscribeToSystemTheme(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const storedTheme = useSyncExternalStore<Theme>(
    subscribeToStoredTheme,
    readStoredTheme,
    () => 'system',
  );
  const systemTheme = useSyncExternalStore<ResolvedTheme>(
    subscribeToSystemTheme,
    getSystemTheme,
    () => 'light',
  );
  const [themeOverride, setThemeOverride] = useState<Theme | null>(null);
  const theme = themeOverride ?? storedTheme;
  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', resolvedTheme === 'dark');
    root.style.colorScheme = resolvedTheme;
    window.localStorage.setItem('moneybag-theme', theme);
    window.dispatchEvent(new CustomEvent('moneybag-theme-change', { detail: resolvedTheme }));
  }, [resolvedTheme, theme]);

  const setTheme = useCallback((nextTheme: Theme) => setThemeOverride(nextTheme), []);
  const toggleTheme = useCallback(
    () =>
      setThemeOverride((currentTheme) => {
        const activeTheme = currentTheme ?? storedTheme;
        return activeTheme === 'light' ? 'dark' : activeTheme === 'dark' ? 'system' : 'light';
      }),
    [storedTheme],
  );

  const value = useMemo(
    () => ({ resolvedTheme, theme, setTheme, toggleTheme }),
    [resolvedTheme, setTheme, theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
