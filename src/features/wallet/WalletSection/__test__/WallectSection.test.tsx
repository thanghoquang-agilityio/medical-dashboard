import { render } from '@testing-library/react';
import WalletSection from '..';

describe('WallectSections', () => {
  const setup = () => render(<WalletSection />);

  it('should render correctly', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
