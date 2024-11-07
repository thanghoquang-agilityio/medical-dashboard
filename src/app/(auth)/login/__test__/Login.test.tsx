import { act, render } from '@testing-library/react';
import LoginPage from '../page';

describe('Login page test case', () => {
  const setup = () => render(<LoginPage />);

  it('should render correctly', async () => {
    const { asFragment } = await act(() => setup());

    expect(asFragment()).toMatchSnapshot();
  });
});
