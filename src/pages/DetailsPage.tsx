import { ErrorState } from '../components/ErrorState.tsx';
import { EmptyState } from '../components/EmptyState.tsx';
import { getStockColor } from '../utils/getStockColor.ts';
import { useProduct } from '../hooks/useProduct.ts';

export default function DetailsPage() {
  const { product, loading, error, handleCloseDetails } = useProduct();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 my-auto">
        <span className="text-xs font-black uppercase tracking-wider mt-4 animate-pulse">
          Loading Product Details...
        </span>
      </div>
    );
  }
  if (error) return <ErrorState error={error} />;
  if (!product) return <EmptyState message="No product found whith that ID" />;

  return (
    <aside className="relative w-full h-full flex flex-col gap-5 font-mono text-foreground md:p-6 ">
      <button
        className="absolute top-2 right-0 z-10 cursor-pointer text-xs font-black uppercase tracking-wider bg-background border-2 border-foreground px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(43,41,39,1)] dark:shadow-[2px_2px_0px_0px_rgba(244,239,226,1)] active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0px_0px_rgba(43,41,39,1)] transition-all"
        onClick={handleCloseDetails}
      >
        [ Close ]
      </button>

      <div className="w-full rounded-xs bg-background-secondary border-2 border-foreground p-4 flex justify-center items-center relative group">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full max-h-48 object-contain mix-blend-multiply dark:mix-blend-normal transform group-hover:scale-102 transition-transform"
        />
        <div className="absolute bottom-2 left-2 bg-foreground text-background text-[9px] font-black uppercase px-2 py-0.5 tracking-widest">
          IMG_RECD
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-xs uppercase tracking-widest text-accent font-black block">
          {product.brand || 'GENERIC_BRAND'}
        </span>
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none text-foreground">
          {product.title}
        </h2>

        <div className="inline-block bg-price text-background text-lg font-black px-3 py-1 border border-foreground transform -rotate-1 mt-2 shadow-[2px_2px_0px_0px_rgba(43,41,39,0.15)]">
          ${Math.round(product.price)}
        </div>
      </div>

      <div className="bg-surface border border-foreground p-3 rounded-xs">
        <p className="text-text-secondary text-xs md:text-sm leading-relaxed uppercase font-semibold">
          {product.description}
        </p>
      </div>

      <div className="border-t-2 border-dashed border-foreground/30 pt-4 mt-auto flex flex-col gap-2 text-xs md:text-sm">
        <div className="flex justify-between items-center">
          <span className="text-text-muted font-bold uppercase tracking-wider">
            STOCK_COUNT:
          </span>
          <strong className="text-foreground font-black bg-background-secondary px-2 py-0.5 border border-foreground/10">
            {product.stock} UNITS
          </strong>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-muted font-bold uppercase tracking-wider">
            USER_RATING:
          </span>
          <strong className="text-foreground font-black bg-background-secondary px-2 py-0.5 border border-foreground/10">
            ★ {product.rating.toFixed(1)} / 5.0
          </strong>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-muted font-bold uppercase tracking-wider">
            AVAIL_STATUS:
          </span>
          <strong
            className={`${getStockColor(product.availabilityStatus)} font-black uppercase tracking-wide bg-background px-2 py-0.5 border-2 border-current`}
          >
            {product.availabilityStatus}
          </strong>
        </div>
      </div>
    </aside>
  );
}
