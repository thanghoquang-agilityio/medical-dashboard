import { fireEvent, render, screen } from '@testing-library/react';

// Components
import { SidebarMobile } from './SideBarMobile';

// Services
import { logout } from '@/services';

jest.mock('../../../services/auth.ts', () => ({
  logout: jest.fn(),
}));
describe('SidebarMobile test cases', () => {
  const mockLogout = logout as jest.Mock;

  const setup = () => render(<SidebarMobile />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should able to logout when clicking logout button', () => {
    setup();

    const openSidebarBtn = screen.getByTestId('open-sidebar-mobile');

    fireEvent.click(openSidebarBtn);

    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
    });

    fireEvent.click(logoutBtn);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
