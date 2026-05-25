import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

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
      className="flex flex-col sm:flex-row gap-4 items-stretch justify-between w-full font-mono"
      onSubmit={handleSubmit}
    >
      <div className="relative flex-1 flex items-stretch border-2 border-foreground bg-card shadow-[3px_3px_0px_0px_rgba(43,41,39,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,239,226,1)] focus-within:translate-x-px focus-within:translate-y-px focus-within:shadow-[4px_4px_0px_0px_rgba(43,41,39,1)] dark:focus-within:shadow-[4px_4px_0px_0px_rgba(244,239,226,1)] transition-all">
        <span className="flex items-center justify-center bg-background-secondary border-r-2 border-foreground px-3 text-xs font-black uppercase tracking-wider text-text-secondary select-none">
          FIND:
        </span>

        <input
          className="w-full bg-transparent px-4 py-3 text-sm font-bold text-foreground outline-none placeholder:text-xs placeholder:text-text-muted placeholder:font-normal"
          type="text"
          placeholder="Type keyword... (e.g. Samsung, Apple, Watch, Sport)"
          value={input}
          onChange={handleChange}
        />

        {input && (
          <button
            type="button"
            onClick={handleClear}
            className="px-3 text-text-secondary hover:text-danger cursor-pointer transition-colors font-black text-sm"
            aria-label="Clear input"
          >
            [X]
          </button>
        )}
      </div>

      <button
        className="cursor-pointer bg-primary text-foreground font-black text-sm uppercase tracking-wider px-6 py-3 sm:py-0 min-w-32 border-2 border-foreground shadow-[3px_3px_0px_0px_rgba(43,41,39,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,239,226,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(43,41,39,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(244,239,226,1)] transition-all"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
