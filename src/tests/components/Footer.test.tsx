import { render, screen } from '@testing-library/react';
import { Footer } from '../../components/Footer';

describe('Footer', () => {
  it('should render footer content', () => {
    render(<Footer />);

    expect(screen.getByText(/tbilisi 2026/i)).toBeInTheDocument();
  });

  it('should render rs school link', () => {
    render(<Footer />);

    const link = screen.getByRole('link', {
      name: /rs school logo/i,
    });

    expect(link).toHaveAttribute('href', 'https://rs.school/');
  });

  it('should render github link', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /github profile/i });

    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/levansarishvili'
    );
  });

  it('should render rs school logo', () => {
    render(<Footer />);

    const img = screen.getByAltText(/rs school logo/i);

    expect(img).toBeInTheDocument();
  });
});
