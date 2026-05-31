import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 font-sans select-none antialiased">
      <div className="w-full max-w-md bg-card border border-border/80 p-6 md:p-8 text-center shadow-xl rounded-2xl flex flex-col items-center gap-6 transition-all duration-300">
        <div className="w-full bg-background-secondary/50 rounded-xl py-10 px-6 flex justify-center items-center relative border border-border/40 overflow-hidden">
          <img
            className="w-44 max-w-full opacity-65 dark:opacity-80 transition-opacity dark:invert object-contain"
            src="/assets/page-not-found.svg"
            alt="Page not found illustration"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
            Page not found
          </h1>
          <p className="text-sm text-text-muted max-w-70 mx-auto leading-relaxed">
            The link you followed may be broken, or the product index path might
            have been removed from our marketplace directory.
          </p>
        </div>

        <div className="w-full border-t border-border/60 my-1" />

        <div className="w-full flex flex-col sm:flex-row items-center gap-3 justify-center">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary text-white font-medium text-sm transition-all duration-200 shadow-sm shadow-primary/10 hover:opacity-95 active:scale-98 text-center"
          >
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-surface text-text-secondary font-medium text-sm transition-all duration-200 text-center border border-border hover:bg-background-secondary hover:text-foreground active:scale-98 cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
