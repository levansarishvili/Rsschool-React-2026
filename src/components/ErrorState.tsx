type PropsType = {
  error?: string;
  status?: number;
};

export function ErrorState({ error }: PropsType) {
  return (
    <div className="flex flex-col gap-6 justify-center items-center max-w-lg mx-auto my-10 p-6 bg-surface border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(43,41,39,1)] dark:shadow-[4px_4px_0px_0px_rgba(244,239,226,1)] font-mono text-center">
      <div className="w-full bg-background-secondary border-2 border-dashed border-foreground/30 p-6 flex justify-center items-center relative">
        <img
          className="w-48 max-w-full opacity-75 grayscale contrast-125 dark:invert"
          src="/assets/page-not-found.svg"
          alt="Page error"
        />
        <span className="absolute top-2 left-2 bg-danger text-background text-[10px] font-black px-1.5 uppercase tracking-wider border border-foreground">
          SYS_ERR
        </span>
      </div>

      <div className="w-full space-y-2">
        <div className="text-xs font-black uppercase tracking-widest text-text-muted">
          -- DIAGNOSTIC LOG --
        </div>

        <div className="bg-background border-2 border-foreground p-3 text-left rounded-sm">
          <p className="text-sm font-bold text-foreground break-all">
            <span className="text-danger font-black">&gt;&gt;</span> Error:{' '}
            {error ?? 'Unknown error encountered.'}
          </p>
        </div>
      </div>
    </div>
  );
}
