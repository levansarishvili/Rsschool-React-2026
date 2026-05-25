import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearAllSelections } from '../store/shopSlice';
import { downloadItemsAsCSV } from '../utils/csvDownloader';

export const SelectionFlyout = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.shop.selectedItems);

  if (selectedItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-foreground text-background p-4 border-t-4 border-primary shadow-[0_-4px_10px_rgba(0,0,0,0.15)] font-mono animate-[slideUp_0.2s_ease-out]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-primary text-foreground text-xs font-black px-2 py-1 uppercase tracking-wider">
            Active Selection
          </span>
          <p className="text-sm font-bold uppercase">
            Total Selected Products:{' '}
            <span className="text-accent font-black">
              {selectedItems.length}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <button
            onClick={() => dispatch(clearAllSelections())}
            className="text-xs font-black uppercase tracking-wider bg-background-secondary text-foreground px-4 py-2 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] active:translate-x-px active:translate-y-px transition-all cursor-pointer"
          >
            Clear All
          </button>

          <button
            onClick={() => downloadItemsAsCSV(selectedItems)}
            className="text-xs font-black uppercase tracking-wider bg-primary text-foreground px-5 py-2 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] active:translate-x-px active:translate-y-px transition-all cursor-pointer"
          >
            💾 Download CSV ({selectedItems.length})
          </button>
        </div>
      </div>
    </div>
  );
};
