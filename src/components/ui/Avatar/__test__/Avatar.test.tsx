import { render } from '@testing-library/react';

import { Avatar } from '..';

describe('Avatar Component', () => {
  it('renders with default size (md) and without border', () => {
    const { container } = render(<Avatar />);

    expect(container).toMatchSnapshot();
  });

  it('renders with border when hasBorder is true', () => {
    const color = 'warning';
    const { getByTestId } = render(
      <Avatar hasBorder color={color} data-testid="avatar-border" />,
    );

    const avatar = getByTestId('avatar-border');
    expect(avatar).toHaveClass(`border-2 border-${color} border-opacity-25`);
  });
});
