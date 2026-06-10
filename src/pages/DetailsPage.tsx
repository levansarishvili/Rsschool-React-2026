import { ErrorState } from '../components/ErrorState.tsx';
import { EmptyState } from '../components/EmptyState.tsx';
import { getStockColor } from '../utils/getStockColor.ts';
import { X } from 'lucide-react';
import { getRtkErrorMessage } from '../utils/getRtkErrorMessage.ts';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetProductQuery } from '../services/api.ts';
import Loader from '../components/Loader.tsx';
import { ROUTE_PATHS } from '../constants/index.ts';

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    data: product,
    isFetching,
    isError,
    error,
  } = useGetProductQuery(id ?? '', {
    skip: !id,
  });

  const handleCloseDetails = () => {
    navigate(`${ROUTE_PATHS.PRODUCTS}?${searchParams.toString()}`);
  };

  const errorMessage = getRtkErrorMessage(error);

  if (isFetching) {
    return <Loader message="Loading Product Details..." />;
  }
  if (isError) return <ErrorState error={errorMessage} />;
  if (!product) return <EmptyState message="No product found with that ID" />;

  return (
    <aside className="relative w-full h-full flex flex-col gap-6 font-sans text-foreground md:p-2">
      <div className="absolute top-0 right-0 z-20 flex items-center gap-2">
        <button
          className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-card border border-border/80 text-text-secondary hover:text-foreground hover:bg-background-secondary transition-all duration-200 shadow-xs active:scale-95"
          onClick={handleCloseDetails}
          aria-label="Close details"
        >
          <X className="w-4" />
        </button>
      </div>

      <div className="w-full h-56 rounded-2xl bg-background-secondary/60 border border-border/60 p-6 flex justify-center items-center relative overflow-hidden group">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-w-full max-h-full w-auto h-auto object-contain mix-blend-multiply dark:mix-blend-normal transform group-hover:scale-103 transition-transform duration-300 ease-out"
        />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-wider text-primary font-semibold block">
          {product.brand || 'Generic'}
        </span>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground leading-tight">
          {product.title}
        </h2>

        <div className="inline-block bg-foreground text-background text-xl font-semibold px-3 py-1 rounded-xl mt-1 shadow-xs">
          ${Math.round(product.price)}
        </div>
      </div>

      <div className="bg-card border border-border/60 p-4 rounded-xl shadow-xs">
        <p className="text-text-secondary text-sm leading-relaxed font-normal">
          {product.description}
        </p>
      </div>

      <div className="border-t border-border/60 pt-5 mt-auto flex flex-col gap-3.5 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-text-muted font-medium">Available stock</span>
          <span className="text-foreground font-semibold bg-background-secondary px-2.5 py-1 rounded-lg text-xs border border-border/40">
            {product.stock} units
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-muted font-medium">Customer rating</span>
          <span className="text-foreground font-semibold bg-background-secondary px-2.5 py-1 rounded-lg text-xs border border-border/40 flex items-center gap-1">
            <span className="text-amber-400">★</span>{' '}
            {product.rating.toFixed(1)} / 5.0
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-muted font-medium">
            Availability status
          </span>
          <span
            className={`${getStockColor(product.availabilityStatus)} font-medium text-xs tracking-normal px-2.5 py-1 rounded-lg border border-current/20 bg-current/5`}
          >
            {product.availabilityStatus}
          </span>
        </div>
      </div>
    </aside>
  );
}
