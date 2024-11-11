import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';

import { InputSearch } from '..';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue('1'),
  }),
  useRouter: jest.fn().mockReturnValue({
    replace: jest.fn(),
  }),
  usePathname: jest.fn().mockReturnValue(''),
}));

describe('InputSearch', () => {
  jest.useFakeTimers();

  const mockUseSearchParams = useSearchParams as jest.Mock;
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('Should render SearchInput Component correctly', () => {
    mockUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(''),
    });

    const { container } = render(
      <InputSearch
        classNames={{
          mainWrapper: 'mock',
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should invoke handleChangeInput and updateSearchParams when typing', async () => {
    mockUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('1'),
    });

    render(<InputSearch placeholder="Search" />);

    const searchInput: HTMLInputElement = screen.getByPlaceholderText('Search');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Name' } });
    });

    jest.advanceTimersByTime(600);

    await waitFor(() => {
      expect(searchInput.value).toBe('Name');
    });
  });

  it('clears invoke handleClear function when clearing the input', async () => {
    render(<InputSearch placeholder="Search..." value="example" />);

    const input: HTMLInputElement = screen.getByPlaceholderText('Search...');
    const clearButton: HTMLButtonElement = screen.getByRole('button'); // Assuming there's a clear button

    // Simulate clearing the input
    fireEvent.click(clearButton);

    await waitFor(() => {
      fireEvent.change(input, { target: { value: '' } });
    });
  });

  it('should clear the search params when the input is empty', async () => {
    render(<InputSearch placeholder="Search" />);

    const searchInput: HTMLInputElement = screen.getByPlaceholderText('Search');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Name' } });
    });

    jest.advanceTimersByTime(600);

    await waitFor(() => {
      expect(searchInput.value).toBe('Name');
    });

    act(() => {
      fireEvent.change(searchInput, { target: { value: '' } });
    });

    jest.advanceTimersByTime(600);

    await waitFor(() => {
      expect(searchInput.value).toBe('');
    });
  });
});
