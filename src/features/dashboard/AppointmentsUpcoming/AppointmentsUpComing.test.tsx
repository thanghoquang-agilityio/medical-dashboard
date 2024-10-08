import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { act, render, screen } from '@testing-library/react';

// Constants
import { PRIVATE_ROUTES } from '@/constants';

// Utils
import { resolvedComponent } from '@/utils';

// Services
import { getAppointments } from '@/services';

// Mocks
import { MOCK_APPOINTMENTS } from '@/mocks';

// Types
import { ROLE } from '@/types';

// Components
import AppointmentsUpcoming, { AppointmentsUpcomingProps } from '.';

jest.mock('../../../services/appointment.ts', () => ({
  getAppointments: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));
describe('AppointmentsUpComing test cases', () => {
  const mockProps: AppointmentsUpcomingProps = {
    role: ROLE.NORMAL_USER,
    status: 'new',
    userId: '1',
  };
  const mockGetAppointments = getAppointments as jest.Mock;
  const mockReplace = jest.fn();
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  const setup = async (props: AppointmentsUpcomingProps) => {
    const ResolvedAppointmentsUpComing = await resolvedComponent(
      AppointmentsUpcoming,
      props,
    );
    return act(() => render(<ResolvedAppointmentsUpComing />));
  };

  beforeEach(() => {
    mockGetAppointments.mockReturnValue({ appointments: MOCK_APPOINTMENTS });
    mockUsePathname.mockReturnValue(PRIVATE_ROUTES.DASHBOARD);
    mockUseRouter.mockReturnValue({ replace: mockReplace });
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { asFragment } = await setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly without props and role', async () => {
    mockGetAppointments.mockReturnValue({ appointments: undefined });

    await setup({ ...mockProps, role: '' });

    const emptyMessage = screen.getByText(/Result Not Found/i);

    expect(emptyMessage).toBeInTheDocument();
  });
});
