import { render } from '@testing-library/react';
import { WalletBalance } from '../WalletBalance';

describe('WalletBalance', () => {
  const setup = () => render(<WalletBalance />);

  it('should render correctly', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
