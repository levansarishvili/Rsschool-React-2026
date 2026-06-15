import { useSearchParams } from 'react-router-dom';
import { API_PRODUCTS_LIMIT } from '../../constants';
import { getVisiblePages } from '../../utils/getVisiblePages';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PropsType = {
  totalProducts: number;
};

export default function Pagination({ totalProducts }: PropsType) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(totalProducts / API_PRODUCTS_LIMIT);

  const visiblePages = getVisiblePages(currentPage, totalPages);

  const handleNextPage = () => {
    setSearchParams({
      page: String(currentPage + 1),
    });
  };

  const handlePrevPage = () => {
    setSearchParams({
      page: String(currentPage - 1),
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({
      page: String(page),
    });
  };

  return (
    <div className="flex flex-wrap gap-1.5 items-center justify-center font-sans select-none my-8">
      <button
        className="flex items-center gap-1 text-text-secondary border border-border text-sm font-medium px-3.5 py-2 rounded-xl cursor-pointer bg-card hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-text-secondary transition-all duration-200 shadow-xs"
        disabled={currentPage === 1}
        onClick={handlePrevPage}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-1 bg-background-secondary/60 p-1 border border-border rounded-xl">
        {visiblePages.map((page, index) =>
          page === '...' ? (
            <span
              key={index + page}
              className="text-text-muted px-3 py-1.5 text-sm font-medium w-9 h-9 flex items-center justify-center"
            >
              &hellip;
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(Number(page))}
              className={`text-sm font-medium w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200
            ${
              currentPage === page
                ? 'bg-primary text-white font-semibold shadow-xs shadow-primary/10'
                : 'text-text-secondary bg-transparent hover:bg-card hover:text-foreground'
            }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        className="flex items-center gap-1 text-text-secondary border border-border text-sm font-medium px-3.5 py-2 rounded-xl cursor-pointer bg-card hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-text-secondary transition-all duration-200 shadow-xs"
        disabled={currentPage === totalPages}
        onClick={handleNextPage}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4" />
      </button>
    </div>
  );
}
