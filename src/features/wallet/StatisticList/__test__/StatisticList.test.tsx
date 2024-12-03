import { render } from '@testing-library/react';
import StatisticList from '..';

describe('StatisticList', () => {
  const setup = () => render(<StatisticList />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
