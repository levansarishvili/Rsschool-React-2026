type PropsType = {
  error?: string;
  status?: number;
};

export function ErrorState({ error }: PropsType) {
  return (
    <div className="flex flex-col gap-6 justify-center items-center max-w-md mx-auto my-12 p-6 bg-card border border-border/80 rounded-2xl shadow-sm font-sans text-center transition-all duration-300">
      <div className="w-full bg-background-secondary/50 rounded-xl p-8 flex justify-center items-center relative border border-border/40 overflow-hidden">
        <img
          className="w-36 max-w-full opacity-65 dark:opacity-80 transition-opacity dark:invert object-contain"
          src="/assets/page-not-found.svg"
          alt="Page error graphic"
        />
      </div>

      <div className="w-full space-y-3">
        <div className="space-y-1">
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Unable to load content
          </h3>
        </div>

        <div className="bg-background-secondary border border-border rounded-xl p-3 text-left shadow-inner">
          <p className="text-xs font-mono font-medium text-text-secondary break-all leading-normal flex items-start gap-1.5">
            <span className="text-danger font-semibold select-none shrink-0">
              ✕
            </span>
            <span>{error ?? 'An unknown network error occurred.'}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
