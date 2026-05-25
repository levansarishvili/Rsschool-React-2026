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
    <form
      className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-background border border-foreground px-2 py-1 shadow-[1px_1px_0px_0px_rgba(43,41,39,1)] font-mono text-[10px]"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="checkbox"
        id={`select-${product.id}`}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="w-3.5 h-3.5 cursor-pointer accent-primary border border-foreground rounded-none"
      />
      <label
        htmlFor={`select-${product.id}`}
        className="font-black uppercase cursor-pointer text-foreground text-[9px] tracking-wide"
      >
        {isSelected ? 'Selected' : 'Select'}
      </label>
    </form>
  );
}
