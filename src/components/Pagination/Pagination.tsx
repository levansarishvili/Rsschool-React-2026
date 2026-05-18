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
        className="border border-gray-200 text-sm rounded-lg px-4 py-2 cursor-pointer 
          bg-white hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
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
            className={`border border-gray-200 text-sm rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-200 
              ${currentPage === page ? 'bg-gray-200' : ''}`}
          >
            {page}
          </button>
        )
      )}

      <button
        className="border border-gray-200 text-sm rounded-lg px-4 py-2 cursor-pointer 
          bg-white hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        disabled={currentPage === totalPages}
        onClick={handleNextPage}
      >
        Next
      </button>
    </div>
  );
}
