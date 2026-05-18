import { useState } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
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
      className="flex gap-6 md:gap-12 justify-between"
      onSubmit={handleSubmit}
    >
      <div className="relative w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <SearchIcon className="size-5" />
        </span>

        <input
          className="w-full bg-white border border-gray-200 rounded-lg px-12 py-3 text-sm outline-primary 
            placeholder:text-sm placeholder:text-gray-400 placeholder:italic pr-10"
          type="text"
          placeholder="Search for products (e.g. Samsung, Apple, Watch, Ball, Sport)"
          value={input}
          onChange={handleChange}
        />

        {input && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 cursor-pointer"
            aria-label="Clear input"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <button
        className="cursor-pointer hover:bg-secondary transition-all duration-200 bg-primary 
        text-white text-sm w-40 rounded-lg"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
