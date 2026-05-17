import { Link } from 'react-router-dom';
import type { ProductType } from '../../types/types.ts';
import { Star } from 'lucide-react';

type PropsType = {
  productObj: ProductType;
};

export default function ProductCard({ productObj }: PropsType) {
  const { id, name, description, price, rating, image } = productObj;

  return (
    <Link to={`details/${id}`}>
      <article className="relative max-w-76 group">
        <div
          className="absolute inset-0 rounded-lg bg-primary/10 z-0
          group-hover:translate-y-1 group-hover:-translate-x-1 transition-all duration-200"
        ></div>

        <div
          className="relative z-10 flex h-full top-0 left-0 flex-col gap-4 justify-between items-center 
            w-full border border-gray-200 p-4 rounded-lg bg-white        
            group-hover:-translate-y-1 group-hover:translate-x-1
            group-hover:shadow-xl transition-all 
            duration-200 cursor-pointer group"
        >
          <img
            src={image || './assets/placeholder.png'}
            alt={name || 'product image'}
            className="w-28 h-auto mb-2 object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-all duration-200"
          />
          {name && <h2 className="text-sm md:text-base font-medium">{name}</h2>}

          {description && (
            <p
              title={description}
              className="text-xs md:text-sm text-gray-600 line-clamp-4"
            >
              {description}
            </p>
          )}

          {price !== undefined && (
            <p className="text-sm md:text-base font-medium">
              ${Math.round(price)}
            </p>
          )}

          {rating !== undefined && (
            <div className="flex">
              {Array.from({ length: Math.round(rating) }, (_, i) => (
                <Star
                  className="size-4 stroke-yellow-600 fill-yellow-600"
                  key={i}
                  data-testid="star-icon"
                />
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
