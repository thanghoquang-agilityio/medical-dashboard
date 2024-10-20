import { render, screen } from '@testing-library/react';
import React, { act, JSX, ClassAttributes, ImgHTMLAttributes } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Mocks
import { MOCK_NOTIFICATION_LIST } from '@/mocks';

// Components
import ActivityFeedList, { ActivityFeedListProps } from './ActivityFeedList';

// Constants
import { PRIVATE_ROUTES } from '@/constants';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>,
  ) => {
    return <img {...props} />;
  },
}));

describe('ActivityFeedList test cases', () => {
  const mockProps: ActivityFeedListProps = {
    notifications: MOCK_NOTIFICATION_LIST,
    userId: '1',
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 3,
    },
  };
  const mockReplace = jest.fn();
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    mockUsePathname.mockReturnValue(PRIVATE_ROUTES.DASHBOARD);
    mockUseRouter.mockReturnValue({ replace: mockReplace });
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = async (props: ActivityFeedListProps) =>
    await act(() => render(<ActivityFeedList {...props} />));

  it('should render correctly', async () => {
    const { asFragment } = await setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render ActivityFeedListSkeleton when pending', async () => {
    jest.spyOn(React, 'useTransition').mockReturnValue([true, jest.fn()]);

    await setup(mockProps);

    expect(
      screen.getByTestId('activity-feed-list-skeleton'),
    ).toBeInTheDocument();
  });
});
