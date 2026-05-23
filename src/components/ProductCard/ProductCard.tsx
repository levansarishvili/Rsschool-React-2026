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
    <Link to={`/details/${id}?${searchParams.toString()}`}>
      <article className="group relative bg-card text-foreground rounded-xl border border-border min-w-36 max-w-68 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

        <div className="relative flex h-full flex-col gap-3 justify-between items-center p-4">
          <img
            src={image || './assets/placeholder.png'}
            alt={name || 'product image'}
            className="w-24 h-24 object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-all duration-200"
          />

          {name && (
            <h2 className="text-sm md:text-base font-semibold text-center line-clamp-2">
              {name}
            </h2>
          )}

          {description && (
            <p
              title={description}
              className="text-xs md:text-sm text-text-secondary line-clamp-2 text-center"
            >
              {description}
            </p>
          )}

          <div className="flex flex-col items-center gap-2">
            {price !== undefined && (
              <p className="text-base font-bold text-price">
                ${Math.round(price)}
              </p>
            )}

            {rating !== undefined && (
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.round(rating) }, (_, i) => (
                  <Star
                    key={i}
                    className="size-3 stroke-yellow-500 fill-yellow-500"
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
