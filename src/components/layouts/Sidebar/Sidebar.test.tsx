import { fireEvent, render, screen } from '@testing-library/react';

// Components
import { Sidebar } from '.';

// Services
import { logout } from '@/services';

jest.mock('@/services/auth.ts', () => ({
  logout: jest.fn(),
}));
describe('Sidebar test cases', () => {
  const mockLogout = logout as jest.Mock;

  const setup = () => render(<Sidebar />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should able to logout when clicking logout button', () => {
    setup();

    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
    });

    fireEvent.click(logoutBtn);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
