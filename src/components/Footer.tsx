import { IoLogoGithub } from 'react-icons/io';
import ErrorButton from './ErrorButton';

export function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-8 py-6 text-sm">
      <a href="https://rs.school/" target="_blank" rel="noreferrer">
        <img className="w-8" src="./assets/rs-logo.svg" alt="Rs school logo" />
      </a>

      <div className="flex items-center gap-3">
        <a
          href="https://github.com/levansarishvili"
          target="_blank"
          rel="noreferrer"
          className="hover:text-primary transition-colors"
          aria-label="GitHub profile"
        >
          <IoLogoGithub className="text-2xl" />
        </a>
        <p>&copy; Tbilisi 2026</p>
      </div>
      <div className="flex gap-4">
        <ErrorButton />
      </div>
    </footer>
  );
}
