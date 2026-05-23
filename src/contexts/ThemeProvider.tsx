import { useEffect, type ReactNode } from 'react';
import { THEMES } from '../constants';
import { ThemeContext } from './theme-context';
import useLocalStorage from '../hooks/useLocalStorage';

type Theme = (typeof THEMES)[keyof typeof THEMES];

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', THEMES.LIGHT);

  const toggleTheme = () => {
    setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  };

  useEffect(() => {
    document.documentElement.classList.toggle(
      THEMES.DARK,
      theme === THEMES.DARK
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
