import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, describe, vi } from 'vitest';
import { mockProduct } from '../../test-utils/mocks/productsMockData';
import ProductCheckbox from '../../components/ProductCard/ProductCheckbox';

describe('ProductCheckbox Component', () => {
  it('should render the checkbox unchecked with the "Select" label', () => {
    render(
      <ProductCheckbox
        product={mockProduct}
        isSelected={false}
        onCheckboxChange={vi.fn()}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('should render the checkbox checked with the "Selected" label', () => {
    render(
      <ProductCheckbox
        product={mockProduct}
        isSelected={true}
        onCheckboxChange={vi.fn()}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(screen.getByText('Selected')).toBeInTheDocument();
  });

  it('should call onCheckboxChange when the checkbox or label is clicked', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();

    render(
      <ProductCheckbox
        product={mockProduct}
        isSelected={false}
        onCheckboxChange={mockOnChange}
      />
    );

    const label = screen.getByText('Select');
    await user.click(label);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('should stop event propagation to parent elements when clicked', async () => {
    const user = userEvent.setup();
    const parentClickMock = vi.fn();

    render(
      <div onClick={parentClickMock} data-testid="parent-container">
        <ProductCheckbox
          product={mockProduct}
          isSelected={false}
          onCheckboxChange={vi.fn()}
        />
      </div>
    );

    const label = screen.getByText('Select');
    await user.click(label);

    expect(parentClickMock).not.toHaveBeenCalled();
  });
});
