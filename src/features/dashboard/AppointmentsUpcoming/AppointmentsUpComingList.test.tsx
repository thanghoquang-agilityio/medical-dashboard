import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { act, fireEvent, render, screen } from '@testing-library/react';

// Constants
import { PRIVATE_ROUTES } from '@/constants';

// Mocks
import { MOCK_APPOINTMENTS } from '@/mocks';

// Components
import AppointmentsUpcomingList, {
  AppointmentsUpcomingListProps,
} from './AppointmentsUpcomingList';

jest.mock('../../../services/appointment.ts', () => ({
  getAppointments: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));
describe('AppointmentsUpComingList test cases', () => {
  const mockProps: AppointmentsUpcomingListProps = {
    appointments: MOCK_APPOINTMENTS,
    defaultStatus: 'new',
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
  const mockSearchParams = new URLSearchParams();

  const setup = async (props: AppointmentsUpcomingListProps) =>
    act(() => render(<AppointmentsUpcomingList {...props} />));

  beforeEach(() => {
    mockUsePathname.mockReturnValue(PRIVATE_ROUTES.DASHBOARD);
    mockUseRouter.mockReturnValue({ replace: mockReplace });
    mockUseSearchParams.mockReturnValue(mockSearchParams);
  });

  afterEach(() => jest.clearAllMocks());

  it('should render correctly', async () => {
    const { asFragment } = await setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should be able to filter by status', async () => {
    await setup(mockProps);

    const statusSelect = screen.getByRole('button', {
      name: /new appointment status/i,
    });

    fireEvent.click(statusSelect);

    const statusOption = screen.getByRole('option', {
      name: /meeting/i,
    });

    fireEvent.click(statusOption);

    expect(statusSelect.textContent).toBe('Meeting');
    expect(mockReplace).toHaveBeenCalled();
  });
});
