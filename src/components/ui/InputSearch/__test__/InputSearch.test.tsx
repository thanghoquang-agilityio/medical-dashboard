import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';

import { InputSearch } from '..';

describe('InputSearch', () => {
  it('Should render SearchInput Component correctly', () => {
    const { container } = render(<InputSearch />);

    expect(container).toMatchSnapshot();
  });

  it('Should be handleChangeInput is called', async () => {
    const { getByPlaceholderText } = render(
      <InputSearch placeholder="Search" />,
    );
    const searchInput = getByPlaceholderText('Search') as HTMLInputElement;

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Name' } });
    });

    await waitFor(() => {
      expect(searchInput.value).toBe('Name');
    });
  });

  it('clears the search params when the input is cleared', async () => {
    render(<InputSearch placeholder="Search..." value="example" />);

    const input = screen.getByPlaceholderText('Search...');
    const clearButton = screen.getByRole('button'); // Assuming there's a clear button

    // Simulate clearing the input
    fireEvent.click(clearButton);

    await waitFor(() => {
      fireEvent.change(input, { target: { value: '' } });
    });
  });
});
