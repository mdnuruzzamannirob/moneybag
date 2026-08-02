'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = Exclude<Theme, 'system'>;

type ThemeContextValue = {
  resolvedTheme: ResolvedTheme;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Keep the first client render identical to the server render. The saved
  // preference is loaded after hydration to avoid changing button attributes
  // while React is attaching to the server HTML.
  const [theme, setTheme] = useState<Theme>('system');
  const [initialized, setInitialized] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('moneybag-theme');
    if (storedTheme === 'dark' || storedTheme === 'light' || storedTheme === 'system') {
      setTheme(storedTheme);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = (resolved: ResolvedTheme) => {
      const root = document.documentElement;
      root.classList.toggle('dark', resolved === 'dark');
      root.style.colorScheme = resolved;
      setResolvedTheme(resolved);
      window.dispatchEvent(new CustomEvent('moneybag-theme-change', { detail: resolved }));
    };

    const resolveTheme = (): ResolvedTheme =>
      theme === 'system' ? (mediaQuery.matches ? 'dark' : 'light') : theme;

    applyTheme(resolveTheme());
    window.localStorage.setItem('moneybag-theme', theme);

    if (theme !== 'system') return;

    const handleChange = () => applyTheme(resolveTheme());
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [initialized, theme]);

  const value = useMemo(
    () => ({
      resolvedTheme,
      theme,
      setTheme,
      toggleTheme: () =>
        setTheme((current) =>
          current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light',
        ),
    }),
    [resolvedTheme, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
