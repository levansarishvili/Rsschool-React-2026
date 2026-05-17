import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="shadow-md bg-gray-50">
      <div className="flex justify-between max-w-360 mx-auto gap-4 px-4 md:px-8 py-4">
        <Link to="/" className="text-xl font-bold text-blue-600">
          <h1 className="text-lg md:text-xl text-center font-semibold">
            🛒 RS-React-App
          </h1>
        </Link>
        <nav className="flex gap-6">
          <Link
            to="/"
            className="hover:text-primary font-medium uppercase text-sm transition-all duration-150"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-primary font-medium uppercase text-sm transition-all duration-150"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
