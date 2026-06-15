import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

const setSearchParamsMock = vi.fn();

function mockSearchParams(page: string) {
  (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
    new URLSearchParams({ page }),
    setSearchParamsMock,
  ]);
}

describe('Pagination', () => {
  beforeEach(() => {
    setSearchParamsMock.mockClear();
  });

  it('should render Prev and Next buttons', () => {
    mockSearchParams('1');

    render(<Pagination totalProducts={100} />);

    expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('should disable Prev on first page', () => {
    mockSearchParams('1');

    render(<Pagination totalProducts={100} />);

    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
  });

  it('should disable Next on last page', () => {
    mockSearchParams('10');

    render(<Pagination totalProducts={120} />);

    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('clicking Next should increase page', () => {
    mockSearchParams('1');

    render(<Pagination totalProducts={100} />);

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      page: '2',
    });
  });

  it('clicking Prev should decrease page', () => {
    mockSearchParams('3');

    render(<Pagination totalProducts={100} />);

    fireEvent.click(screen.getByRole('button', { name: /prev/i }));

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      page: '2',
    });
  });

  it('clicking page number should update page', () => {
    mockSearchParams('2');

    render(<Pagination totalProducts={100} />);

    fireEvent.click(screen.getByText('3'));

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      page: '3',
    });
  });
});
