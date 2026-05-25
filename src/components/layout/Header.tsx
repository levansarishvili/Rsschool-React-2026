import { Link, NavLink, useSearchParams } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher';

export function Header() {
  const [searchParams] = useSearchParams();

  return (
    <header className="sticky top-0 z-50 bg-background border-b-4 border-foreground">
      <div className="flex justify-between items-center max-w-360 mx-auto gap-4 px-4 md:px-8 py-4">
        <Link to={`/?${searchParams.toString()}`} className="">
          <h1 className="font-mono text-base md:text-lg font-black uppercase tracking-wider text-foreground hover:text-primary transition-colors select-none">
            [RS_REACT_APP]
          </h1>
        </Link>

        <nav className="flex gap-4 md:gap-8">
          <NavLink
            to={`/?${searchParams.toString()}`}
            className={({ isActive }) =>
              `text-sm md:text-base uppercase font-black tracking-wider px-3 py-1.5 transition-all ${
                isActive
                  ? 'text-foreground bg-primary border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(244,239,226,1)]'
                  : 'text-text-secondary hover:text-primary hover:translate-y'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm md:text-base uppercase font-black tracking-wider px-3 py-1.5 transition-all ${
                isActive
                  ? 'text-foreground bg-primary border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(244,239,226,1)]'
                  : 'text-text-secondary hover:text-primary hover:translate-y'
              }`
            }
          >
            About
          </NavLink>
        </nav>

        <div className="border-2 border-foreground p-1 bg-surface shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(244,239,226,1)]">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
