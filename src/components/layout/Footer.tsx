import { IoLogoGithub } from 'react-icons/io';
import ErrorButton from '../ErrorButton';

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border text-text-secondary">
      <div className="max-w-340 mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 py-8 text-sm font-sans tracking-normal">
        <a
          href="https://rs.school/"
          target="_blank"
          rel="noreferrer"
          className="p-2.5 rounded-xl border border-border bg-background-secondary transition-all duration-200 hover:border-text-muted/30 hover:bg-surface"
        >
          <img
            className="w-9 opacity-70 hover:opacity-100 transition-opacity dark:invert"
            src="/assets/rs-logo.svg"
            alt="Rs school logo"
          />
        </a>

        <div className="flex flex-col sm:flex-row items-center gap-4 text-center">
          <a
            href="https://github.com/levansarishvili"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors duration-200"
            aria-label="GitHub profile"
          >
            <IoLogoGithub className="text-xl opacity-80" />
            <span className="hover:underline decoration-primary/40 underline-offset-4">
              levansarishvili
            </span>
          </a>

          <span className="hidden sm:inline text-text-disabled">•</span>

          <p className="text-text-muted font-normal">&copy; Tbilisi 2026</p>
        </div>

        <div className="flex rounded-xl overflow-hidden p-0.5 bg-background-secondary border border-border shadow-sm">
          <ErrorButton />
        </div>
      </div>
    </footer>
  );
}
