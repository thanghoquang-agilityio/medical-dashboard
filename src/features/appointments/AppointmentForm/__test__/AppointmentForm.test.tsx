import { fireEvent, render, screen } from '@testing-library/react';
import AppointmentForm, { AppointmentModalProps } from '..';
import { MOCK_APPOINTMENTS, MOCK_USERS_LOGGED } from '@/mocks';
import { getUsers } from '@/actions/user';

jest.mock('@/actions/user.ts', () => ({
  getUsers: jest.fn(),
}));
describe('AppointmentForm test cases', () => {
  const mockOnClose = jest.fn();
  const mockProps: AppointmentModalProps = {
    userLogged: MOCK_USERS_LOGGED[1],
    onClose: mockOnClose,
    data: undefined,
    id: undefined,
  };
  const mockGetUsers = getUsers as jest.Mock;

  beforeEach(() => {
    mockGetUsers.mockResolvedValueOnce({
      users: MOCK_USERS_LOGGED,
      error: null,
    });
  });

  const setup = (props: AppointmentModalProps) =>
    render(<AppointmentForm {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { asFragment } = setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with providing data', () => {
    const { asFragment } = setup({
      ...mockProps,
      data: MOCK_APPOINTMENTS[1].attributes,
      id: MOCK_APPOINTMENTS[1].id,
    });

    const statusSelectBtn: HTMLButtonElement = screen.getByRole('button', {
      name: /new status/i,
    });

    fireEvent.click(statusSelectBtn);

    const statusOption: HTMLLIElement = screen.getByRole('option', {
      name: /meeting/i,
    });

    fireEvent.click(statusOption);

    expect(asFragment()).toMatchSnapshot();
  });
});
