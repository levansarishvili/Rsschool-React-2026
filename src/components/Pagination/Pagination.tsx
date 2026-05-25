import { useSearchParams } from 'react-router-dom';
import { API_PRODUCTS_LIMIT } from '../../constants';
import { getVisiblePages } from '../../utils/getVisiblePages';

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
    <div className="flex flex-wrap gap-2 items-center justify-center font-mono select-none">
      <button
        className="text-foreground border-2 border-foreground text-sm font-black uppercase px-4 py-2 cursor-pointer 
      bg-surface shadow-[3px_3px_0px_0px_rgba(43,41,39,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,239,226,1)]
      active:translate-x active:translate-y active:shadow-[1px_1px_0px_0px_rgba(43,41,39,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(244,239,226,1)]
      disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none transition-all"
        disabled={currentPage === 1}
        onClick={handlePrevPage}
      >
        &#9664; Prev
      </button>

      <div className="flex border-2 border-foreground bg-background divide-x-2 divide-foreground shadow-[3px_3px_0px_0px_rgba(43,41,39,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,239,226,1)]">
        {visiblePages.map((page, index) =>
          page === '...' ? (
            <span
              key={index + page}
              className="text-text-muted px-4 py-2 text-sm font-bold bg-background-secondary flex items-center justify-center"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(Number(page))}
              className={`text-sm font-black px-4 py-2 cursor-pointer transition-colors
            ${
              currentPage === page
                ? 'bg-accent text-background'
                : 'text-foreground bg-card hover:bg-background-secondary'
            }`}
            >
              {String(page).padStart(2, '0')}
            </button>
          )
        )}
      </div>

      <button
        className="text-foreground border-2 border-foreground text-sm font-black uppercase px-4 py-2 cursor-pointer 
      bg-surface shadow-[3px_3px_0px_0px_rgba(43,41,39,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,239,226,1)]
      active:translate-x active:translate-y active:shadow-[1px_1px_0px_0px_rgba(43,41,39,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(244,239,226,1)]
      disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none transition-all"
        disabled={currentPage === totalPages}
        onClick={handleNextPage}
      >
        Next &#9654;
      </button>
    </div>
  );
}
