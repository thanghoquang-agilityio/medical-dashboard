import { render, waitFor, screen } from '@testing-library/react';

import AppointmentsHistory, { AppointmentsHistoryProps } from '.';
import { MOCK_APPOINTMENTS } from '@/mocks';
import { ROLE } from '@/constants';

const mockReplace = jest.fn();

// Mock next
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
  useRouter: () => ({ replace: mockReplace }),
  usePathname: jest.fn(),
}));

describe('AppointmentsHistory Component', () => {
  const setup = (props: AppointmentsHistoryProps) =>
    render(<AppointmentsHistory {...props} />);

  it('should render empty result', async () => {
    setup({ appointments: [], role: ROLE.USER, userId: '1' });

    await waitFor(() => {
      expect(screen.getByText(/Result Not Found/i)).toBeInTheDocument();
    });
  });

  it('should render loading indicator when during fetching', () => {
    setup({ appointments: [], role: ROLE.USER, userId: '1' });

    waitFor(() => {
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });
  });

  it('should render correctly with user role when have appointments value', () => {
    const { container } = setup({
      appointments: MOCK_APPOINTMENTS,
      role: ROLE.USER,
      userId: '1',
    });

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with admin role when have appointments value', () => {
    const { container } = setup({
      appointments: MOCK_APPOINTMENTS,
      role: ROLE.ADMIN,
      userId: '1',
    });

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when appointments value is empty', () => {
    const { container } = setup({
      appointments: [],
      role: ROLE.USER,
      userId: '1',
    });

    expect(container).toMatchSnapshot();
  });
});
