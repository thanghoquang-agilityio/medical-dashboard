import { render, screen, fireEvent } from '@testing-library/react';

// Types
import { STATUS_TYPE } from '@/types';

// Components
import { Toast } from '..';

describe('Toast component', () => {
  const mockOnClose = jest.fn();

  it('renders the success toast correctly', () => {
    const { container } = render(
      <Toast
        message="Item moved successfully."
        status={STATUS_TYPE.SUCCESS}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText('Item moved successfully.')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders the error toast correctly', () => {
    render(
      <Toast
        message="Item has been deleted."
        status={STATUS_TYPE.ERROR}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText('Item has been deleted.')).toBeInTheDocument();

    expect(screen.getByTestId('toast-icon')).toHaveClass('text-danger-100');
  });

  it('renders the warning toast correctly', () => {
    render(
      <Toast
        message="Improve password difficulty."
        status={STATUS_TYPE.WARNING}
        onClose={mockOnClose}
      />,
    );

    expect(
      screen.getByText('Improve password difficulty.'),
    ).toBeInTheDocument();

    expect(screen.getByTestId('toast-icon')).toHaveClass('text-warning');
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Toast
        message="Item moved successfully."
        status={STATUS_TYPE.SUCCESS}
        onClose={mockOnClose}
      />,
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
