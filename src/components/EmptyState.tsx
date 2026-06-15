type PropsType = {
  message: string;
};

export function EmptyState({ message }: PropsType) {
  return (
    <div className="flex flex-col gap-6 justify-center items-center max-w-sm mx-auto my-16 p-8 text-center font-sans">
      <div className="relative flex items-center justify-center w-40 h-40 rounded-full bg-background-secondary/80 border border-border/40 p-4 transition-transform duration-300 hover:scale-102">
        <img
          className="w-24 max-w-full opacity-80 dark:opacity-90 transition-opacity dark:invert object-contain"
          src="/assets/data-not-found.svg"
          alt="No products found"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-foreground font-semibold text-lg tracking-tight">
          No products found
        </h3>
        <p className="text-sm font-normal text-text-muted max-w-70 mx-auto leading-relaxed">
          {message ||
            "We couldn't find anything matching your current selection. Try adjusting your filters."}
        </p>
      </div>
    </div>
  );
}
