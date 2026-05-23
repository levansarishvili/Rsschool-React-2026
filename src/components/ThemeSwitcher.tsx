import { Moon, SunMedium } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <button
        onClick={toggleTheme}
        className="px-1 py-0.5 cursor-pointer transition-all duration-150 group"
      >
        {theme === 'dark' ? (
          <SunMedium className="w-6 group-hover:stroke-primary" />
        ) : (
          <Moon className="w-6 group-hover:stroke-primary" />
        )}
      </button>
    </div>
  );
}
