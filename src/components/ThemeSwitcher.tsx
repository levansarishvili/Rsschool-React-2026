import { Moon, SunMedium } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex items-center w-14 h-7 bg-surface border border-border rounded-full cursor-pointer select-none overflow-hidden transition-colors duration-300 hover:bg-background-secondary group"
    >
      <span
        className={`flex-1 flex justify-center items-center z-10 transition-colors duration-300 ${
          theme === 'light' ? 'text-foreground' : 'text-text-muted/50'
        }`}
      >
        <SunMedium className="w-3.5 h-3.5" />
      </span>

      <span
        className={`flex-1 flex justify-center items-center z-10 transition-colors duration-300 ${
          theme === 'dark' ? 'text-foreground' : 'text-text-muted/50'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </span>

      <div
        className={`
      absolute top-0.5 bottom-0.5 w-6 h-6 rounded-full 
      bg-background border border-border/40 shadow-sm
      transition-all duration-300 ease-out
      ${theme === 'dark' ? 'left-[calc(100%-1.625rem)]' : 'left-0.5'}
    `}
      />
    </button>
  );
}
