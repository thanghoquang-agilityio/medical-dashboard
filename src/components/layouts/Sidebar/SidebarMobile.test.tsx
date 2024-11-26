import { fireEvent, render, screen } from '@testing-library/react';

// Components
import { SidebarMobile } from './SideBarMobile';

describe('SidebarMobile test cases', () => {
  const setup = () => render(<SidebarMobile />);

  const mockFetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(''),
  });

  global.fetch = mockFetch;

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

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
