import { render } from '@testing-library/react';
import NotFound from '../not-found';

describe('NotFound page test case', () => {
  const setup = () => render(<NotFound />);

  it('should render correctly', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
