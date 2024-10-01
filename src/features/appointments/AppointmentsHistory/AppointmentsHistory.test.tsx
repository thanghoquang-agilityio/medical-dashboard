import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';

// Components
import AppointmentsHistory, { AppointmentsHistoryProps } from '.';

// Mocks
import { MOCK_APPOINTMENTS } from '@/mocks';

// Constants
import { ROLE } from '@/constants';

const mockReplace = jest.fn();

// Mock next
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
  useRouter: () => ({ replace: mockReplace }),
  usePathname: jest.fn(),
}));

describe('AppointmentsHistory Component', () => {
  const setup = async (props: AppointmentsHistoryProps) =>
    act(() => render(<AppointmentsHistory {...props} />));

  it('should render empty result', async () => {
    await setup({ appointments: [], role: ROLE.USER, userId: '1' });

    await waitFor(() => {
      expect(screen.getByText(/Result Not Found/i)).toBeInTheDocument();
    });
  });

  it('should render loading indicator when during fetching', async () => {
    await setup({ appointments: [], role: ROLE.USER, userId: '1' });

    waitFor(() => {
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });
  });

  it('should render correctly with user role when have appointments value', async () => {
    const { container } = await setup({
      appointments: MOCK_APPOINTMENTS,
      role: ROLE.USER,
      userId: '1',
    });

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with admin role when have appointments value', async () => {
    const { container } = await setup({
      appointments: MOCK_APPOINTMENTS,
      role: ROLE.ADMIN,
      userId: '1',
    });

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when appointments value is empty', async () => {
    const { container } = await setup({
      appointments: [],
      role: ROLE.USER,
      userId: '1',
    });

    expect(container).toMatchSnapshot();
  });

  it('should be able to filter by status', async () => {
    await setup({
      appointments: MOCK_APPOINTMENTS,
      role: ROLE.USER,
      userId: '1',
    });

    const statusSelect = screen.getByRole('button', {
      name: /status status/i,
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
