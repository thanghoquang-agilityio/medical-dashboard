import { render } from '@testing-library/react';
import { Status, StatusProps } from '..';

describe('Status test cases', () => {
  const mockProps: StatusProps = {
    status: 0,
    className: '',
  };
  const setup = (props: StatusProps) => render(<Status {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    const { asFragment } = setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with provided props', () => {
    const { asFragment } = setup({ status: 1, className: 'mock' });

    expect(asFragment()).toMatchSnapshot();
  });
});
