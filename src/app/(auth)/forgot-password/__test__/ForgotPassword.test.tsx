import { render } from '@testing-library/react';
import ForgotPasswordPage from '../page';

describe('ForgotPassword page test case', () => {
  const setup = () => render(<ForgotPasswordPage />);

  it('should render correctly', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
