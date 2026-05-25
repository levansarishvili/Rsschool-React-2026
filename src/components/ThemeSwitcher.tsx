import { useTheme } from '../hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex items-center w-16 h-8 bg-background border-2 border-foreground shadow-[inner_2px_2px_0px_0px_rgba(0,0,0,0.15)] overflow-hidden cursor-pointer select-none group font-mono"
    >
      <span className="absolute left-1.5 text-[9px] font-black tracking-tight text-text-muted uppercase pointer-events-none">
        AM
      </span>
      <span className="absolute right-1.5 text-[9px] font-black tracking-tight text-text-muted uppercase pointer-events-none">
        PM
      </span>

      <div
        className={`
      absolute top-0 bottom-0 w-8 h-full 
      bg-surface border-x-2 border-foreground
      flex items-center justify-center
      transition-all duration-100 ease-in-out
      ${
        theme === 'dark'
          ? 'left-8 bg-accent text-background shadow-[-2px_0px_0px_0px_rgba(43,41,39,0.2)]'
          : 'left-0 bg-primary text-foreground shadow-[2px_0px_0px_0px_rgba(43,41,39,0.2)]'
      }
    `}
      >
        {theme === 'dark' ? (
          <span className="text-xs font-black select-none">🌙</span>
        ) : (
          <span className="text-xs font-black select-none">☀️</span>
        )}
      </div>
    </button>
  );
}
