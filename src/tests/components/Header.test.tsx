import { render, screen } from '@testing-library/react';
import { Header } from '../../components/Header';

describe('Header', () => {
  const onSearchMock = vi.fn();

  it('should render header title', () => {
    render(<Header searchQuery="" onSearch={onSearchMock} />);

    const header = screen.getByRole('heading');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('RS-React-App');
  });

  it('should render search component', () => {
    render(<Header searchQuery="" onSearch={onSearchMock} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
