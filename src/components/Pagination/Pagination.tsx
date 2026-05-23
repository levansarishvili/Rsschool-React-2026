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
    <div className="flex gap-4 items-center">
      <button
        className="text-text-secondary border border-border text-sm rounded-lg px-4 py-2 cursor-pointer 
          bg-background-secondary disabled:cursor-not-allowed disabled:opacity-50 disabled:text-text-disabled"
        disabled={currentPage === 1}
        onClick={handlePrevPage}
      >
        Prev
      </button>

      {visiblePages.map((page, index) =>
        page === '...' ? (
          <span key={index + page}>...</span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(Number(page))}
            className={`border text-text-secondary border-border text-sm rounded-lg px-4 py-2 cursor-pointer hover:bg-card 
              ${currentPage === page ? 'bg-card' : ''}`}
          >
            {page}
          </button>
        )
      )}

      <button
        className="text-text-secondary border border-border text-sm rounded-lg px-4 py-2 cursor-pointer 
          bg-background-secondary disabled:cursor-not-allowed disabled:opacity-50 disabled:text-text-disabled"
        disabled={currentPage === totalPages}
        onClick={handleNextPage}
      >
        Next
      </button>
    </div>
  );
}
