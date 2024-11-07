import { render } from '@testing-library/react';
import ErrorPage from '../error';

describe('Error page test case', () => {
  const setup = (props: {
    error: Error & { digest?: string };
    reset: () => void;
  }) => render(<ErrorPage {...props} />);

  it('should render correctly', () => {
    const { asFragment } = setup({
      error: new Error('Mock error'),
      reset: jest.fn(),
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
