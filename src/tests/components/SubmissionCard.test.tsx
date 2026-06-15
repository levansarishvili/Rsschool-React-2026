import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { SavedSubmission } from '../../store/formSlice';
import { SubmissionCard } from '../../components/SubmissionCard';

describe('SubmissionCard Component', () => {
  const mockItem: SavedSubmission = {
    id: 'sub-123',
    name: 'Giga',
    age: 24,
    email: 'giga@test.ge',
    gender: 'male',
    country: 'Georgia',
    imageBase64:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    submittedAt: 1717880000000,
  };

  it('should accurately display all provided layout text and image attributes', () => {
    render(<SubmissionCard item={mockItem} isLatest={false} />);

    expect(screen.getByText('Giga')).toBeInTheDocument();
    expect(screen.getByText('giga@test.ge')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('Georgia')).toBeInTheDocument();

    const genderNode = screen.getByText('male');
    expect(genderNode).toBeInTheDocument();
    expect(genderNode).toHaveClass('capitalize');

    const profileImg = screen.getByRole('img', { name: 'Giga' });
    expect(profileImg).toBeInTheDocument();
    expect(profileImg).toHaveAttribute('src', mockItem.imageBase64);
  });

  it('should inject highlighting warning class values when isLatest prop evaluates to true', () => {
    const { container } = render(
      <SubmissionCard item={mockItem} isLatest={true} />
    );
    const rootDiv = container.firstChild;

    expect(rootDiv).toHaveClass('border-warning');
    expect(rootDiv).toHaveClass('ring-2');
    expect(rootDiv).toHaveClass('ring-warning/30');
    expect(rootDiv).toHaveClass('scale-[1.02]');

    expect(rootDiv).not.toHaveClass('border-border');
  });

  it('should fall back onto base subtle layouts when isLatest prop evaluates to false', () => {
    const { container } = render(
      <SubmissionCard item={mockItem} isLatest={false} />
    );
    const rootDiv = container.firstChild;

    expect(rootDiv).toHaveClass('border-border');

    expect(rootDiv).not.toHaveClass('border-warning');
    expect(rootDiv).not.toHaveClass('scale-[1.02]');
  });
});
