import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { X } from 'lucide-react';

type PropsType = {
  searchQuery: string;
  onSearch: (query: string) => void;
};

function Search({ searchQuery, onSearch }: PropsType) {
  const [savedQuery, setSavedQuery] = useLocalStorage('searchQuery', '');
  const [input, setInput] = useState(searchQuery || savedQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = input.trim().toLowerCase();
    const previous = (savedQuery || '').trim().toLowerCase();

    if (query === previous) return;

    onSearch(query);
    setSavedQuery(query);
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <form
      className="flex flex-col sm:flex-row gap-3 items-stretch justify-between w-full font-sans"
      onSubmit={handleSubmit}
    >
      <div className="relative flex-1 flex items-center border border-border/80 bg-card rounded-xl px-4 shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-text-muted shrink-0 mr-1 select-none"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        <input
          className="w-full bg-transparent py-3 text-sm font-normal text-foreground outline-none placeholder:text-text-disabled"
          type="text"
          placeholder="Search for products... (e.g. Samsung, Apple, Watch)"
          value={input}
          onChange={handleChange}
        />

        {input && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded-full text-text-muted hover:text-danger hover:bg-danger/10 cursor-pointer transition-colors shrink-0"
            aria-label="Clear search input"
          >
            <X className="w-3.5" />
          </button>
        )}
      </div>

      <button
        className="cursor-pointer bg-primary text-white font-medium text-sm px-6 py-3 sm:py-0 min-w-28 rounded-xl transition-all duration-200 hover:opacity-95 active:scale-98 shadow-sm shadow-primary/10"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
