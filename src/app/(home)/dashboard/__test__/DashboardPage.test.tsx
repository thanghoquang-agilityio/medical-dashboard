import { renderServerComponent } from '@/utils/test-util';
import DashboardPage from '../page';
import { getAppointments, getNotifications, getUserLogged } from '@/services';
import {
  MOCK_APPOINTMENTS,
  MOCK_NOTIFICATION_LIST,
  MOCK_USERS_LOGGED,
} from '@/mocks';
import { act } from '@testing-library/react';

jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    handlers: jest.fn(),
    signOut: jest.fn(),
    auth: jest.fn(),
  }),
}));

jest.mock('@/services', () => ({
  getUserLogged: jest.fn(),
  getNotifications: jest.fn(),
  getAppointments: jest.fn(),
}));
describe('Dashboard page', () => {
  const mockGetUserLogged = getUserLogged as jest.Mock;
  const mockGetNotifications = getNotifications as jest.Mock;
  const mockGetAppointments = getAppointments as jest.Mock;

  beforeEach(() => {
    mockGetUserLogged.mockResolvedValue({
      user: MOCK_USERS_LOGGED[0],
      error: null,
    });

    mockGetNotifications.mockResolvedValue({
      notifications: MOCK_NOTIFICATION_LIST,
    });

    mockGetAppointments.mockResolvedValue({
      appointments: MOCK_APPOINTMENTS,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = async () => act(() => renderServerComponent(<DashboardPage />));

  it('should render correctly', async () => {
    const { asFragment } = await setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
