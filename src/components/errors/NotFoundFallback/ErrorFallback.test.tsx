import { fireEvent, render, screen } from '@testing-library/react';
import { NotFoundFallback, NotFoundFallbackProps } from '.';

describe('NotFoundFallback test cases', () => {
  const mockErrorMsg: string = 'mock error message';
  const mockReset = jest.fn();
  const setup = (props: NotFoundFallbackProps) =>
    render(<NotFoundFallback {...props} />);

  it('should render correctly with message', () => {
    const { asFragment } = setup({ message: mockErrorMsg });

    expect(asFragment()).toMatchSnapshot();

    const errorMessage: HTMLInputElement = screen.getByText(
      new RegExp(mockErrorMsg, 'i'),
    );

    expect(errorMessage.textContent).toEqual(mockErrorMsg);
  });

  it('should call reset funtion when clicking reset the page', () => {
    setup({ message: mockErrorMsg, reset: mockReset });

    const resetText = screen.getByText(/reset the page/i);

    fireEvent.click(resetText);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
