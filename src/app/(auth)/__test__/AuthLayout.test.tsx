import { act, render } from '@testing-library/react';
import AuthLayout from '../layout';

jest.mock('next-themes', () => ({
  useTheme: jest.fn().mockReturnValue({
    theme: 'mock',
    setTheme: jest.fn(),
  }),
}));
describe('NotFound page test case', () => {
  const setup = (
    props: Readonly<{
      children: React.ReactNode;
    }>,
  ) => render(<AuthLayout {...props} />);

  it('should render correctly', async () => {
    const { asFragment } = await act(() =>
      setup({ children: <div>mock children</div> }),
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
