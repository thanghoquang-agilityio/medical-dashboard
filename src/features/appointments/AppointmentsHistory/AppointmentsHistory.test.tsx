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
import { MOCK_APPOINTMENTS, MOCK_USERS_LOGGED } from '@/mocks';

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
    await setup({ appointments: [], userLogged: MOCK_USERS_LOGGED[0] });

    await waitFor(() => {
      expect(screen.getByText(/Result Not Found/i)).toBeInTheDocument();
    });
  });

  it('should render loading indicator when during fetching', async () => {
    await setup({ appointments: [], userLogged: MOCK_USERS_LOGGED[0] });

    waitFor(() => {
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });
  });

  it('should render correctly with user role when have appointments value', async () => {
    const { container } = await setup({
      appointments: MOCK_APPOINTMENTS,
      userLogged: MOCK_USERS_LOGGED[0],
    });

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with admin role when have appointments value', async () => {
    const { container } = await setup({
      appointments: MOCK_APPOINTMENTS,
      userLogged: MOCK_USERS_LOGGED[1],
    });

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when appointments value is empty', async () => {
    const { container } = await setup({
      appointments: [],
      userLogged: MOCK_USERS_LOGGED[0],
    });

    expect(container).toMatchSnapshot();
  });

  it('should be able to filter by status', async () => {
    await setup({
      appointments: MOCK_APPOINTMENTS,
      userLogged: MOCK_USERS_LOGGED[0],
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
