import { render } from '@testing-library/react';
import { MenuDropdown, MenuDropdownProps } from '..';

describe('MoreAction test cases', () => {
  const setup = (props: MenuDropdownProps) =>
    render(<MenuDropdown {...props} />);

  const mockProps: MenuDropdownProps = {
    options: [
      {
        key: '1',
        label: 'Mock',
        isDisabled: false,
      },
    ],
    icon: <></>,
  };
  it('should render correctly', () => {
    const { asFragment } = setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });
});
