type PropsType = {
  message: string;
};

export function EmptyState({ message }: PropsType) {
  return (
    <div
      className="flex flex-col gap-6 justify-center items-center max-w-md mx-auto my-12 p-8 
    bg-surface border-2 border-dashed border-foreground shadow-[4px_4px_0px_0px_rgba(43,41,39,1)] dark:shadow-[4px_4px_0px_0px_rgba(244,239,226,1)] text-center font-mono"
    >
      <div className="relative p-2 bg-background border-2 border-foreground rounded-sm">
        <img
          className="w-48 max-w-full opacity-75 dark:invert grayscale contrast-125"
          src="/assets/data-not-found.svg"
          alt="Item not found"
        />
      </div>

      <div className="space-y-2">
        <span className="text-danger font-black text-lg block tracking-tight uppercase">
          [ ! ] SYSTEM NOTICE
        </span>
        <p className="text-sm font-bold text-text-secondary leading-relaxed uppercase">
          {message || 'Requested index returned zero results.'}
        </p>
      </div>

      <div className="w-full border-t border-foreground/20 border-dashed my-1" />

      <span className="text-[10px] text-text-muted uppercase tracking-widest">
        --- End of Registry Record ---
      </span>
    </div>
  );
}
