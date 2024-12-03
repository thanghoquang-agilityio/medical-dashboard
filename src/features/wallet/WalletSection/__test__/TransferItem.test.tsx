import { render } from '@testing-library/react';
import { TransferItem } from '../TransferItem';

describe('TransferItem', () => {
  const setup = () => render(<TransferItem />);

  it('should render correctly', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
