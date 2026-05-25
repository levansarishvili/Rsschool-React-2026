import { Link, useSearchParams } from 'react-router-dom';
import type { ProductType } from '../../types/types.ts';
import { Star } from 'lucide-react';

type PropsType = {
  productObj: ProductType;
};

export default function ProductCard({ productObj }: PropsType) {
  const { id, name, description, price, rating, image } = productObj;
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={`/details/${id}?${searchParams.toString()}`}
      className="block h-full"
    >
      <article
        className="min-h-76 group relative bg-card text-foreground rounded-sm border-2 border-foreground min-w-36 max-w-68 h-full flex flex-col justify-between overflow-hidden transition-all duration-200 
          ease-in-out shadow-[4px_4px_0px_0px_rgba(43,41,39,1)] 
          dark:shadow-[4px_4px_0px_0px_rgba(244,239,226,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(43,41,39,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(244,239,226,1)]"
      >
        {price !== undefined && (
          <div className="absolute top-2 right-2 z-10 bg-price text-background font-mono text-xs md:text-sm font-black px-2 py-1 border border-foreground transform rotate-3 group-hover:rotate-0 transition-transform shadow-[1px_1px_0px_0px_rgba(43,41,39,1)]">
            ${Math.round(price)}
          </div>
        )}

        <div className="w-full bg-background-secondary p-4 border-b-2 border-foreground flex justify-center items-center group-hover:bg-surface transition-colors">
          <img
            src={image || './assets/placeholder.png'}
            alt={name || 'product image'}
            className="w-28 h-28 object-contain rounded-none mix-blend-multiply dark:mix-blend-normal transform group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="flex flex-col gap-2 flex-1 justify-between p-4 bg-card">
          <div className="space-y-1">
            {name && (
              <h2 className="text-sm md:text-base font-black tracking-tight line-clamp-2 text-foreground uppercase group-hover:text-primary transition-colors">
                {name}
              </h2>
            )}

            {description && (
              <p
                title={description}
                className="text-xs text-text-secondary font-medium line-clamp-2"
              >
                {description}
              </p>
            )}
          </div>

          <div className="pt-2 border-t border-dashed border-border flex items-center justify-between gap-1 w-full mt-auto">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
              ITEM NO. #{id.toString().padStart(4, '0')}
            </span>

            {rating !== undefined && (
              <div className="flex items-center gap-0.5 bg-background border border-foreground px-1.5 py-0.5 rounded-xs shadow-[1px_1px_0px_0px_rgba(43,41,39,1)]">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`size-2.5 ${
                      i < Math.round(rating)
                        ? 'stroke-foreground fill-accent'
                        : 'stroke-text-disabled fill-transparent'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
