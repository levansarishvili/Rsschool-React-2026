import { Link } from 'react-router-dom';

const baseUrl = import.meta.env.BASE_URL;

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-3 items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
        Requested Resource Not Found
      </h1>

      <img
        className="w-60"
        src={`${baseUrl}/assets/page-not-found.svg`}
        alt="Page error"
      />
      <p className="text-gray-600 max-w-md mb-6">
        The route configuration parameter string typed does not match any index
        paths inside this catalog directory app layout.
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/80 shadow transition-all"
      >
        Return to Home Page
      </Link>
    </div>
  );
}
