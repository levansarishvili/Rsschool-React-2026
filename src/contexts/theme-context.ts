import { createContext } from 'react';
import { THEMES } from '../constants';

type Theme = (typeof THEMES)[keyof typeof THEMES];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
