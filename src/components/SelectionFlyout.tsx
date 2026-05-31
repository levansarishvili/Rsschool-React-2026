import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearAllSelections } from '../store/shopSlice';
import { downloadItemsAsCSV } from '../utils/csvDownloader';

export const SelectionFlyout = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.shop.selectedItems);

  if (selectedItems.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-50 bg-foreground/70 dark:bg-foreground/20 text-background backdrop-blur-md px-5 py-4 rounded-2xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.3)] font-sans animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)] border border-white/10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Track: Dynamic Counter State */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-foreground font-semibold text-xs">
            {selectedItems.length}
          </div>
          <p className="text-sm font-medium tracking-tight text-white/90">
            {selectedItems.length === 1
              ? 'Product selected'
              : 'Products selected'}
          </p>
        </div>

        {/* Right Track: Clean Contextual Action Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => dispatch(clearAllSelections())}
            className="text-xs font-medium bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
          >
            Clear Selection
          </button>

          <button
            onClick={() => downloadItemsAsCSV(selectedItems)}
            className="text-xs font-semibold flex items-center gap-2 bg-primary text-foreground px-4 py-2 rounded-xl shadow-xs shadow-primary/10 hover:opacity-95 transition-all duration-200 cursor-pointer active:scale-95"
          >
            {/* Sleek Modern Download Vector Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Export CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
