import { Link, useSearchParams } from 'react-router-dom';
import type { ProductType } from '../../types/types.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { toggleItemSelection } from '../../store/shopSlice.ts';
import RatingStars from '../RatingStars.tsx';
import ProductCheckbox from './ProductCheckbox.tsx';

type PropsType = {
  productObj: ProductType;
};

export default function ProductCard({ productObj }: PropsType) {
  const { id, title, description, price, rating, thumbnail } = productObj;
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const selectedItems = useAppSelector(
    (state) => state.shop?.selectedItems ?? []
  );

  const isSelected = selectedItems.some(
    (item: ProductType) => item.id === productObj.id
  );

  const handleCheckboxChange = () => {
    dispatch(toggleItemSelection(productObj));
  };
  return (
    <Link
      to={`/details/${id}?${searchParams.toString()}`}
      className="block h-full group"
    >
      <article
        className="max-w-72 relative bg-card text-foreground rounded-2xl border border-border/80 h-full flex flex-col 
      overflow-hidden transition-all duration-300 hover:border-border hover:shadow-md hover:-translate-y-1"
      >
        {price !== undefined && (
          <div className="absolute top-3 right-3 z-10 bg-foreground text-background font-sans text-xs font-semibold px-2.5 py-1 rounded-lg shadow-xs backdrop-blur-xs">
            ${Math.round(price)}
          </div>
        )}

        <div className="absolute top-3 left-3 z-10">
          <ProductCheckbox
            product={productObj}
            isSelected={isSelected}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>

        <div className="w-full bg-background-secondary/60 h-48 sm:h-52 p-6 flex justify-center items-center overflow-hidden transition-colors duration-300 group-hover:bg-background-secondary">
          <img
            src={thumbnail || './assets/placeholder.png'}
            alt={title || 'product image'}
            className="max-w-full max-h-full w-auto h-auto object-contain mix-blend-multiply dark:mix-blend-normal transform group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        </div>

        <div className="flex flex-col gap-3 flex-1 p-4">
          <div className="space-y-1">
            {title && (
              <h2 className="text-sm md:text-base font-semibold tracking-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200">
                {title}
              </h2>
            )}

            {description && (
              <p
                title={description}
                className="text-xs text-text-muted font-normal line-clamp-2 leading-relaxed"
              >
                {description}
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2 w-full mt-auto">
            <span className="text-[11px] font-medium tracking-normal text-text-disabled">
              ID: #{id}
            </span>

            {rating !== undefined && (
              <div className="scale-90 origin-right">
                <RatingStars rating={rating} />
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
