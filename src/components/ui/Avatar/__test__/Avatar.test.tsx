import { render, screen } from '@testing-library/react';

import { Avatar } from '..';

describe('Avatar Component', () => {
  it('renders with default size (md) and without border', () => {
    const { container } = render(<Avatar />);

    expect(container).toMatchSnapshot();
  });

  it('renders with border when isBordered is true', () => {
    render(<Avatar isBordered />);

    const spanElement = screen.getByRole('img').closest('span');

    // Check for bordered class
    expect(spanElement).toHaveClass('ring-offset-2 ring-1 ring-green');
  });

  it('renders with border when isCustomBordered is true', () => {
    render(<Avatar isCustomBordered />);

    const spanElement = screen.getByRole('img').closest('span');

    // Check for bordered class
    expect(spanElement).toHaveClass(
      'ring-offset-0 ring-yellow ring-opacity-25 ring-4',
    );
  });
});
