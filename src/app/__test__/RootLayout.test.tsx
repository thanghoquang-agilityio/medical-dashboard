import { render } from '@testing-library/react';
import RootLayout from '../layout';

jest.mock('next-themes', () => ({
  ThemeProvider: jest.fn(),
}));

describe('NotFound page test case', () => {
  const setup = (
    props: Readonly<{
      children: React.ReactNode;
    }>,
  ) => render(<RootLayout {...props} />);

  it('should render correctly', () => {
    const { asFragment } = setup({ children: <div>mock children</div> });

    expect(asFragment()).toMatchSnapshot();
  });
});
