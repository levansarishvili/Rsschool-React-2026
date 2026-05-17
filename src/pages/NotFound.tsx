// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-9xl font-black text-gray-300">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
        Requested Resource Not Found
      </h2>
      <p className="text-gray-600 max-w-md mb-6">
        The route configuration parameter string typed does not match any index
        paths inside this catalog directory app layout.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 shadow transition-all"
      >
        ↩ Return to Main Catalog Application
      </Link>
    </div>
  );
}
