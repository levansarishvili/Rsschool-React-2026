import type { ProductType } from '../../types/types';

type PropsType = {
  product: ProductType;
  isSelected: boolean;
  onCheckboxChange: () => void;
};

export default function ProductCheckbox({
  product,
  isSelected,
  onCheckboxChange,
}: PropsType) {
  return (
    <div className="" onClick={(e) => e.stopPropagation()}>
      <label
        htmlFor={`select-${product.id}`}
        className="flex items-center justify-center cursor-pointer"
      >
        <input
          type="checkbox"
          id={`select-${product.id}`}
          checked={isSelected}
          onChange={onCheckboxChange}
          className={`
        appearance-none w-5 h-5 cursor-pointer rounded-full border 
        flex items-center justify-center
        transition-all duration-200 shadow-xs
        ${
          isSelected
            ? 'bg-primary border-primary text-white scale-105'
            : 'bg-white/90 dark:bg-card/90 border-border/80 hover:border-text-muted hover:bg-white dark:hover:bg-card'
        }
      `}
          style={{
            backgroundImage: isSelected
              ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")`
              : 'none',
            backgroundSize: '11px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <span className="sr-only">
          {isSelected ? 'Deselect product' : 'Select product'}
        </span>
      </label>
    </div>
  );
}
