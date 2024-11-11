import { render } from '@testing-library/react';
import { MenuAction, MoreActionProps } from '..';

describe('MoreAction test cases', () => {
  const setup = (props: MoreActionProps) => render(<MenuAction {...props} />);

  const mockAction = jest.fn();
  const mockProps: MoreActionProps = {
    options: [
      {
        key: '1',
        label: 'Mock',
        onAction: mockAction,
        isDisabled: false,
      },
    ],
  };
  it('should render correctly', () => {
    const { asFragment } = setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });
});
