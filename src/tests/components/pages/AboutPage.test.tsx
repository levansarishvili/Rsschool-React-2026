import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutPage from '../../../pages/AboutPage';

describe('AboutPage', () => {
  it('should render main title', () => {
    render(<AboutPage />);

    expect(screen.getByText('About This Application')).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(<AboutPage />);

    expect(screen.getByText(/educational assignment/i)).toBeInTheDocument();
  });

  it('should render developer name', () => {
    render(<AboutPage />);

    expect(screen.getByText(/Levan Sarishvili/i)).toBeInTheDocument();
  });

  it('should render GitHub link', () => {
    render(<AboutPage />);

    const github = screen.getByText('Github Account').closest('a');

    expect(github).toHaveAttribute(
      'href',
      'https://github.com/levansarishvili'
    );

    expect(github).toHaveAttribute('target', '_blank');
  });

  it('should render LinkedIn link', () => {
    render(<AboutPage />);

    const linkedin = screen.getByText('Linkedin Account').closest('a');

    expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/levan-sarishvili/'
    );
  });

  it('should render RS School link', () => {
    render(<AboutPage />);

    const courseLink = screen.getByText('RS School React Course Link');

    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});
