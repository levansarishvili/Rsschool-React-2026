import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../../components/Search/Search';

describe('Search', () => {
  const onSearchMock = vi.fn();

  const getInput = () => screen.getByRole('textbox');
  const getSearchButton = () => screen.getByRole('button', { name: /search/i });
  const renderSearch = (searchQuery = '') =>
    render(<Search searchQuery={searchQuery} onSearch={onSearchMock} />);

  beforeEach(() => {
    onSearchMock.mockClear();
    localStorage.clear();
  });

  it('should render search input and submit button', () => {
    renderSearch();

    expect(getInput()).toBeInTheDocument();
    expect(getSearchButton()).toBeInTheDocument();
  });

  it('should hide clear button when input is empty', () => {
    renderSearch();

    const clearButton = screen.queryByRole('button', { name: 'Clear input' });

    expect(clearButton).not.toBeInTheDocument();
  });

  it('should display saved search term from localStorage on mount', () => {
    const searchTerm = 'phone';
    localStorage.setItem('searchQuery', searchTerm);

    renderSearch();

    expect(getInput()).toHaveValue(searchTerm);
  });

  it('should update input value when user types', async () => {
    const user = userEvent.setup();

    renderSearch();

    await user.type(getInput(), 'Test');

    expect(getInput()).toHaveValue('Test');
  });

  it('should save search term to localStorage when search button is clicked', async () => {
    const searchTerm = 'phone';
    const user = userEvent.setup();

    renderSearch();

    await user.type(getInput(), searchTerm);
    await user.click(getSearchButton());

    expect(localStorage.getItem('searchQuery')).toBe(searchTerm);
  });

  it('should update existing localStorage value after new search', async () => {
    const user = userEvent.setup();

    localStorage.setItem('searchQuery', 'old');

    renderSearch();

    await user.clear(getInput());
    await user.type(getInput(), 'new');
    await user.click(getSearchButton());

    expect(localStorage.getItem('searchQuery')).toBe('new');
  });

  it('should not call onSearch when search term has not changed', async () => {
    const user = userEvent.setup();
    const searchTerm = 'phone';

    localStorage.setItem('searchQuery', searchTerm);

    renderSearch(searchTerm);

    await user.clear(getInput());
    await user.type(getInput(), searchTerm);

    await user.click(getSearchButton());

    expect(onSearchMock).not.toHaveBeenCalled();
  });

  it('should trim whitespace from search input before saving', async () => {
    const user = userEvent.setup();
    const searchTerm = ' phone ';

    renderSearch();

    await user.type(getInput(), searchTerm);
    await user.click(getSearchButton());

    expect(onSearchMock).toHaveBeenCalledWith(searchTerm.trim());
  });

  it('should clear input when clear button is clicked', async () => {
    const user = userEvent.setup();

    renderSearch();

    await user.type(getInput(), 'phone');

    const clearButton = screen.getByRole('button', { name: /clear input/i });
    await user.click(clearButton);

    expect(getInput()).toHaveValue('');
    expect(clearButton).not.toBeInTheDocument();
  });
});
