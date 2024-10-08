import { act } from 'react';
import { render } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ActivityFeed, { ActivityFeedProps } from '.';
import { getNotifications } from '@/services';
import { resolvedComponent } from '@/utils';
import { ROLE } from '@/types';
import { MOCK_NOTIFICATION_LIST } from '@/mocks';
import { PRIVATE_ROUTES } from '@/constants';

jest.mock('@/services/notification.ts', () => ({
  getNotifications: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

describe('ActivityFeed test cases', () => {
  const mockProps: ActivityFeedProps = {
    page: 1,
    role: ROLE.NORMAL_USER,
    userId: '6',
  };
  const mockReplace = jest.fn();
  const mockGetNotifications = getNotifications as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  const setup = async (props: ActivityFeedProps) => {
    const ResolvedActivityFeed = await resolvedComponent(ActivityFeed, props);

    return act(() => render(<ResolvedActivityFeed />));
  };

  beforeEach(() => {
    mockUsePathname.mockReturnValue(PRIVATE_ROUTES.DASHBOARD);
    mockUseRouter.mockReturnValue({ replace: mockReplace });
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with props', async () => {
    mockGetNotifications.mockResolvedValueOnce(MOCK_NOTIFICATION_LIST);

    const { asFragment } = await setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly without empty role', async () => {
    mockGetNotifications.mockResolvedValueOnce(MOCK_NOTIFICATION_LIST);

    const { asFragment } = await setup({ ...mockProps, role: '' });

    expect(asFragment()).toMatchSnapshot();
  });
});
