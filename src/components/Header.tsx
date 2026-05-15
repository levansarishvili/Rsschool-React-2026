import Search from './Search/Search';

type PropsType = {
  searchQuery: string;
  onSearch: (query: string) => void;
};

export function Header({ searchQuery, onSearch }: PropsType) {
  return (
    <header className="shadow-md bg-gray-50">
      <div className="flex flex-col max-w-7xl mx-auto gap-4 px-4 md:px-8 py-4">
        <h1 className="text-lg md:text-xl text-center font-semibold">
          RS-React-App
        </h1>

        <Search searchQuery={searchQuery} onSearch={onSearch} />
      </div>
    </header>
  );
}
