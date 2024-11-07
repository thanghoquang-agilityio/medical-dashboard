import { act, render } from '@testing-library/react';
import SignupPage from '../page';

describe('Login page test case', () => {
  const setup = () => render(<SignupPage />);

  it('should render correctly', async () => {
    const { asFragment } = await act(() => setup());

    expect(asFragment()).toMatchSnapshot();
  });
});
