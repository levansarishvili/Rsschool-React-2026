export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto my-12 px-4 font-sans text-foreground space-y-8">
      <div className="text-center p-8 bg-card border border-border/80 rounded-2xl shadow-sm relative overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-foreground">
          Project Overview
        </h1>
        <p className="text-sm md:text-base text-text-secondary max-w-lg mx-auto font-normal leading-relaxed">
          Developed as an educational assignment transforming traditional class
          implementations into clean, highly optimized functional layouts.
        </p>
      </div>

      <div className="border border-border/80 bg-card rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-background-secondary px-6 py-4 border-b border-border/60 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-text-muted">
            Author Information
          </h2>
          <span className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary/40"></span>
            <span className="w-2 h-2 rounded-full bg-primary"></span>
          </span>
        </div>

        <div className="p-6 divide-y divide-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4">
            <span className="text-xs font-medium text-text-muted">
              Developer
            </span>
            <span className="text-sm font-semibold text-foreground">
              Levan Sarishvili
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-4">
            <span className="text-xs font-medium text-text-muted">
              Source Repository
            </span>
            <a
              href="https://github.com/levansarishvili"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors group"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity dark:invert"
                src="./assets/github.svg"
                alt="GitHub"
              />
              <span className="underline underline-offset-4 decoration-primary/20 group-hover:decoration-primary">
                GitHub Profile
              </span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4">
            <span className="text-xs font-medium text-text-muted">
              Professional Network
            </span>
            <a
              href="https://www.linkedin.com/in/levan-sarishvili/"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors group"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity dark:invert"
                src="./assets/linkedin.svg"
                alt="LinkedIn"
              />
              <span className="underline underline-offset-4 decoration-primary/20 group-hover:decoration-primary">
                LinkedIn Profile
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-white font-medium text-sm text-center shadow-xs shadow-primary/10 transition-all duration-200 hover:opacity-95 active:scale-98 cursor-pointer"
        >
          RS School React Course
        </a>
      </div>
    </section>
  );
}
