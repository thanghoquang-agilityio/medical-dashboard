import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useTheme } from 'next-themes';

import SwitchTheme from '..';

describe('SwitchTheme Component', () => {
  const setThemeMock = jest.fn();

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light', // default to light theme
      setTheme: setThemeMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading spinner while the component is not mounted', () => {
    const container = render(<SwitchTheme />);
    expect(container).toMatchSnapshot();
  });

  it('renders the moon icon when the theme is light', async () => {
    render(<SwitchTheme />);

    await waitFor(() => {
      expect(screen.getByLabelText('switch theme')).toBeInTheDocument();
    });

    const moonIcon = screen.getByLabelText('switch theme').querySelector('svg');
    expect(moonIcon).toBeInTheDocument();
  });

  it('renders the brightness icon when the theme is dark', async () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: setThemeMock,
    });

    render(<SwitchTheme />);

    await waitFor(() => {
      expect(screen.getByLabelText('switch theme')).toBeInTheDocument();
    });

    const brightnessIcon = screen
      .getByLabelText('switch theme')
      .querySelector('svg');
    expect(brightnessIcon).toBeInTheDocument();
  });

  it('toggles theme between light and dark when clicked', async () => {
    render(<SwitchTheme />);

    await waitFor(() => {
      expect(screen.getByLabelText('switch theme')).toBeInTheDocument();
    });

    // Click the theme switch button
    const button = screen.getByLabelText('switch theme');
    fireEvent.click(button);

    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });
});
