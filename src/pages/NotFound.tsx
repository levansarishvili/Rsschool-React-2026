import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-background-secondary px-4 py-8 font-mono select-none">
      <div className="w-full max-w-xl bg-card border-4 border-foreground p-6 md:p-8 text-center shadow-[8px_8px_0px_0px_rgba(43,41,39,1)] dark:shadow-[8px_8px_0px_0px_rgba(244,239,226,1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-warning pointer-events-none transform translate-x-8 -translate-y-8 rotate-45 border-b-2 border-foreground" />

        <h1 className="text-xl md:text-2xl font-black text-danger uppercase tracking-tight mb-6">
          Requested Resource Not Found
        </h1>

        <div className="bg-background border-2 border-foreground p-6 mb-6 flex justify-center items-center relative bg-grid-pattern">
          <img
            className="w-52 max-w-full grayscale opacity-75 contrast-125 dark:invert"
            src="/assets/page-not-found.svg"
            alt="Page error"
          />
          <span className="absolute bottom-1.5 left-2 text-[9px] font-black text-text-disabled tracking-widest uppercase">
            Sector_Lookup_Fail
          </span>
        </div>

        <div className="bg-surface border-2 border-dashed border-foreground/30 p-4 mb-8 rounded-xs text-left">
          <span className="text-[10px] font-black text-text-muted block uppercase mb-1">
            Diagnostic_Log:
          </span>
          <p className="text-xs md:text-sm text-text-secondary font-bold uppercase leading-relaxed">
            The route configuration parameter string typed does not match any
            index paths inside this catalog directory app layout.
          </p>
        </div>

        <Link
          to="/"
          className="inline-block w-full sm:w-auto bg-primary text-foreground font-black text-xs md:text-sm uppercase tracking-wider px-6 py-3.5 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(43,41,39,1)] dark:shadow-[4px_4px_0px_0px_rgba(244,239,226,1)] active:translate-x-0.75 active:translate-y-0.75 active:shadow-[1px_1px_0px_0px_rgba(43,41,39,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(244,239,226,1)] transition-all"
        >
          Return to Main Directory
        </Link>
      </div>
    </div>
  );
}
