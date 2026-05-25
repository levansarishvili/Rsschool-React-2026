import { IoLogoGithub } from 'react-icons/io';
import ErrorButton from '../ErrorButton';

export function Footer() {
  return (
    <footer className="w-full bg-surface text-text-secondary flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-8 py-6 text-sm font-mono tracking-tight">
      <a
        href="https://rs.school/"
        target="_blank"
        rel="noreferrer"
        className="border-2 border-dashed border-text-muted p-2 hover:bg-background transition-transform hover:-translate-y-0.5"
      >
        <img
          className="w-10 grayscale opacity-80 hover:opacity-100 dark:invert"
          src="/assets/rs-logo.svg"
          alt="Rs school logo"
        />
      </a>

      <div className="flex flex-col md:flex-row items-center gap-4 border-y md:border-y-0 md:border-x border-foreground/10 px-6 py-2 md:py-0 text-center">
        <a
          href="https://github.com/levansarishvili"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 font-bold uppercase text-foreground hover:text-primary"
          aria-label="GitHub profile"
        >
          <IoLogoGithub className="text-2xl" />
          <span>levansarishvili</span>
        </a>

        <span className="hidden md:inline text-text-muted">•</span>

        <p className="font-semibold uppercase tracking-wider text-text-muted">
          &copy; Tbilisi 2026
        </p>
      </div>

      <div className="flex gap-4 p-1 bg-background border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(244,239,226,1)]">
        <ErrorButton />
      </div>
    </footer>
  );
}
