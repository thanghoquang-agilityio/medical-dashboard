import { act } from '@testing-library/react';
import WalletSection, { WalletSectionProps } from '..';
import { renderServerComponent } from '@/utils/test-util';

describe('WallectSections', () => {
  const setup = (props: WalletSectionProps) =>
    act(() => renderServerComponent(<WalletSection {...props} />));

  it('should render correctly', async () => {
    const { asFragment } = await setup({
      id: '',
      email: '',
      totalBalance: 0,
      totalSpending: 0,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
