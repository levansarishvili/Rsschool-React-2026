import { Link, NavLink, useSearchParams } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher';

export function Header() {
  const [searchParams] = useSearchParams();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-200">
      <div className="flex justify-between items-center max-w-340 px-4 md:px-6 mx-auto gap-4 py-3.5">
        <Link to={`/?${searchParams.toString()}`} className="group">
          <h1 className="font-sans text-lg md:text-xl font-bold tracking-tight text-foreground select-none">
            RS
            <span className="text-primary transition-colors group-hover:text-primary-hover">
              _STORE
            </span>
          </h1>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-200 relative ${
                isActive
                  ? 'text-primary bg-surface font-semibold'
                  : 'text-text-secondary hover:text-foreground hover:bg-background-secondary'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to={`/products?${searchParams.toString()}`}
            className={({ isActive }) =>
              `text-sm font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-200 relative ${
                isActive
                  ? 'text-primary bg-surface font-semibold'
                  : 'text-text-secondary hover:text-foreground hover:bg-background-secondary'
              }`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-200 relative ${
                isActive
                  ? 'text-primary bg-surface font-semibold'
                  : 'text-text-secondary hover:text-foreground hover:bg-background-secondary'
              }`
            }
          >
            About
          </NavLink>
        </nav>

        <div className="flex items-center p-1 rounded-full bg-background-secondary border border-border">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
