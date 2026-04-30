import { Component } from 'react';
import Search from './Search/Search';

type Props = {
  searchQuery: string;
  onSearch: (query: string) => void;
};

export class Header extends Component<Props> {
  render() {
    const { searchQuery, onSearch } = this.props;

    return (
      <header className="flex flex-col gap-6 md:gap-10">
        <h1 className="text-lg md:text-xl text-center font-semibold">
          RS-React-App
        </h1>

        <Search searchQuery={searchQuery} onSearch={onSearch} />
      </header>
    );
  }
}
