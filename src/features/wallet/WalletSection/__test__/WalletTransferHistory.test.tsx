import { render } from '@testing-library/react';
import { WalletTransferHistory } from '../WalletTransferHistory';

describe('WalletTransferHistory', () => {
  const setup = () => render(<WalletTransferHistory />);

  it('should render correctly', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
