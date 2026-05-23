import { Link, NavLink, useSearchParams } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher';

export function Header() {
  const [searchParams] = useSearchParams();

  return (
    <header className="sticky top-0 z-50 shadow-xl bg-background">
      <div className="flex justify-between items-center max-w-360 mx-auto gap-4 px-4 md:px-8 py-4">
        <Link
          to={`/?${searchParams.toString()}`}
          className="text-xl font-semibold"
        >
          <img className="w-10" src="/assets/shop.svg" alt="Shop icon" />
        </Link>
        <nav className="flex gap-6">
          <NavLink
            to={`/?${searchParams.toString()}`}
            className={({ isActive }) =>
              `text-sm uppercase font-medium transition-all duration-150 ${
                isActive
                  ? 'text-primary border-b-2 border-primary'
                  : 'hover:text-primary'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm uppercase font-medium transition-all duration-150 ${
                isActive
                  ? 'text-primary border-b-2 border-primary'
                  : 'hover:text-primary'
              }`
            }
          >
            About
          </NavLink>
        </nav>

        <ThemeSwitcher />
      </div>
    </header>
  );
}
