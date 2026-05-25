export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto my-6 font-mono text-foreground">
      <div className="text-center p-6 border-2 border-foreground bg-surface relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(43,41,39,1)] dark:shadow-[4px_4px_0px_0px_rgba(244,239,226,1)]">
        <div className="absolute top-0 left-0 w-3 h-3 border-b-2 border-r-2 border-foreground bg-background"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-b-2 border-l-2 border-foreground bg-background"></div>

        <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 text-primary"></h1>
        <p className="text-xs md:text-sm text-text-secondary max-w-lg mx-auto font-bold leading-relaxed uppercase">
          Developed as an educational assignment transforming traditional class
          implementations to functional layouts.
        </p>
      </div>

      <div className="mt-8 border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_rgba(43,41,39,1)] dark:shadow-[4px_4px_0px_0px_rgba(244,239,226,1)]">
        <div className="bg-foreground text-background px-4 py-1.5 text-xs font-black uppercase tracking-wider">
          REGISTRY_DATA: AUTHOR_INFO
        </div>

        <div className="divide-y-2 divide-foreground/10 p-4 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2">
            <span className="text-xs font-black uppercase text-text-muted">
              OPERATOR_ID:
            </span>
            <span className="text-sm font-black uppercase text-foreground">
              Levan Sarishvili
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 pb-2">
            <span className="text-xs font-black uppercase text-text-muted">
              NET_LOCATION_01:
            </span>
            <a
              href="https://github.com/levansarishvili"
              className="inline-flex items-center gap-2 text-sm font-black uppercase text-accent hover:text-primary transition-colors group"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-4 h-4 grayscale opacity-80 group-hover:opacity-100 dark:invert"
                src="./assets/github.svg"
                alt="Github"
              />
              <span className="underline decoration-2 underline-offset-4">
                Github Account
              </span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4">
            <span className="text-xs font-black uppercase text-text-muted">
              NET_LOCATION_02:
            </span>
            <a
              href="https://www.linkedin.com/in/levan-sarishvili/"
              className="inline-flex items-center gap-2 text-sm font-black uppercase text-accent hover:text-primary transition-colors group"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-4 h-4 grayscale opacity-80 group-hover:opacity-100 dark:invert"
                src="./assets/linkedin.svg"
                alt="Linkedin"
              />
              <span className="underline decoration-2 underline-offset-4">
                Linkedin Account
              </span>
            </a>
          </div>
        </div>
      </div>

      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-primary text-foreground font-black text-xs md:text-sm uppercase tracking-wider px-6 py-3 border-2 border-foreground shadow-[3px_3px_0px_0px_rgba(43,41,39,1)] 
          dark:shadow-[3px_3px_0px_0px_rgba(244,239,226,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(43,41,39,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(244,239,226,1)] transition-all"
      >
        RS School React Course
      </a>
    </section>
  );
}
