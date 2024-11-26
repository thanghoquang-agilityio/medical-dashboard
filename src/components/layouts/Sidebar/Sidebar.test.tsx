import { fireEvent, render, screen } from '@testing-library/react';

// Components
import { Sidebar } from '.';

describe('Sidebar test cases', () => {
  const setup = () => render(<Sidebar />);

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

    const logoutBtn = screen.getByLabelText('logout button');

    fireEvent.click(logoutBtn);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
