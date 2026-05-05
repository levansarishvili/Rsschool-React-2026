import { Component } from 'react';
import { X } from 'lucide-react';

type Props = {
  searchQuery: string;
  onSearch: (query: string) => void;
};

type State = {
  input: string;
};

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const savedQuery = localStorage.getItem('searchQuery') || '';
    this.state = { input: savedQuery };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const current = this.state.input.trim().toLowerCase();
    const previous = this.props.searchQuery.trim().toLowerCase();

    if (current === previous) return;

    const query = this.state.input.trim();
    this.props.onSearch(query);

    localStorage.setItem('searchQuery', query);
  };

  render() {
    return (
      <form
        className="flex gap-6 md:gap-12 justify-between"
        onSubmit={this.handleSubmit}
      >
        <div className="relative w-full">
          <input
            className="w-full border border-gray-300 rounded-xs px-4 py-3 text-sm outline-primary placeholder:text-sm placeholder:italic pr-10"
            type="text"
            placeholder="Search for products (e.g. Samsung, Apple, Watch, Ball, Sport)"
            value={this.state.input}
            onChange={this.handleChange}
          />

          {this.state.input && (
            <button
              type="button"
              onClick={() => this.setState({ input: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 cursor-pointer"
              aria-label="Clear input"
            >
              <X className="size-5" />
            </button>
          )}
        </div>

        <button
          className="cursor-pointer hover:bg-secondary transition-all duration-200 bg-primary text-white text-sm w-40 rounded-xs"
          type="submit"
        >
          Search
        </button>
      </form>
    );
  }
}

export default Search;
