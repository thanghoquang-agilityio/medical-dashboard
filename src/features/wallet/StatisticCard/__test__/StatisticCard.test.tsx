import { render } from '@testing-library/react';
import StatisticCard, { StatisticCardProps } from '..';

describe('StatisticCard', () => {
  const setup = (props: StatisticCardProps) =>
    render(<StatisticCard {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockProps: StatisticCardProps = {
    title: 'Mock Title',
    value: 100,
  };

  it('should render correctly', () => {
    const { asFragment } = setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });
});
