import { act } from '@testing-library/react';
import {
  WalletTransferHistory,
  WalletTransferHistoryProps,
} from '../WalletTransferHistory';
import { renderServerComponent } from '@/utils/test-util';

describe('WalletTransferHistory', () => {
  const setup = (props: WalletTransferHistoryProps) =>
    act(() => renderServerComponent(<WalletTransferHistory {...props} />));

  it('should render correctly', async () => {
    const { asFragment } = await setup({ id: '' });

    expect(asFragment()).toMatchSnapshot();
  });
});
