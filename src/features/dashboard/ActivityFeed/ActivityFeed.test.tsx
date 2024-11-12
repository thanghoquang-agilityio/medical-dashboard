import React, { act } from 'react';
import { render } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ActivityFeed, { ActivityFeedProps } from '.';
import { getNotifications } from '@/services';
import { resolvedComponent } from '@/utils';

import { MOCK_NOTIFICATION_LIST } from '@/mocks';
import { PRIVATE_ROUTES } from '@/constants';
import { MOCK_USERS_LOGGED } from '@/mocks/user';

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
    userLogged: MOCK_USERS_LOGGED[0],
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
    jest.spyOn(React, 'useMemo').mockReturnValueOnce({});
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

    const { asFragment } = await setup({ ...mockProps, userLogged: null });

    expect(asFragment()).toMatchSnapshot();
  });
});
