import { ReactNode } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

// Hocs
import { TWithToast, buildToastRenderer, withToast } from '../withToast';

// Types
import { STATUS_TYPE } from '@/types';

const Component = ({
  openToast,
}: TWithToast<{
  children: ReactNode;
}>) => {
  const handleOpenToast = () => {
    openToast({ message: 'Test Success' }, mockCallback);
  };

  return (
    <div>
      Test withToast
      <button onClick={handleOpenToast}>Open Toast</button>
    </div>
  );
};

const setup = (isLoading: boolean = false) => {
  const ComponentWithToast = withToast(Component, isLoading);
  return render(<ComponentWithToast>test</ComponentWithToast>);
};

let mockCallback: jest.Mock;

beforeEach(() => {
  mockCallback = jest.fn();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
});

jest.mock('@/utils', () => ({
  cn: jest.fn(() => 'mocked-class'),
}));

describe('withToast tests', () => {
  it('should show Toast correctly when the Open Toast button is clicked', async () => {
    const { getByText, getByRole } = setup();

    const button = getByText('Open Toast');
    fireEvent.click(button);

    await waitFor(() => {
      expect(getByRole('alert')).toBeTruthy(); // Assuming Toast uses role="alert"
      expect(getByText('Test Success')).toBeTruthy();
    });
  });

  it('should hide Toast after 3 seconds', async () => {
    const { getByText, queryByRole } = setup();

    const button = getByText('Open Toast');
    fireEvent.click(button);

    await waitFor(() => {
      expect(queryByRole('alert')).toBeTruthy(); // Assuming Toast uses role="alert"
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(queryByRole('alert')).toBeFalsy();
    });
  });

  it('should call mockCallback after 3 seconds', async () => {
    const { getByText } = setup();

    const button = getByText('Open Toast');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockCallback).not.toHaveBeenCalled();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockCallback).toHaveBeenCalled();
  });

  it('should display loading state when `enableLoading` is true', async () => {
    const { getByText } = setup(true);

    const button = getByText('Open Toast');
    fireEvent.click(button);

    expect(getByText('loading')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(3000);
    });
  });

  it('should not display loading state when `enableLoading` is false', async () => {
    const { getByText, queryByText } = setup(false);

    const button = getByText('Open Toast');
    fireEvent.click(button);

    expect(queryByText('loading')).toBeFalsy();
  });
});

describe('buildToastRenderer', () => {
  it('should return the correct color and message for SUCCESS type', () => {
    const result = buildToastRenderer({
      type: STATUS_TYPE.SUCCESS,
      message: 'Operation successful',
    });

    expect(result).toEqual({
      message: 'Operation successful',
      status: STATUS_TYPE.SUCCESS,
    });
  });

  it('should return default message for SUCCESS type when message is not provided', () => {
    const result = buildToastRenderer({ type: STATUS_TYPE.SUCCESS });

    expect(result).toEqual({
      message: 'Success!',
      status: STATUS_TYPE.SUCCESS,
    });
  });

  it('should return the correct color and message for WARNING type', () => {
    const result = buildToastRenderer({
      type: STATUS_TYPE.WARNING,
      message: 'Warning message',
    });

    expect(result).toEqual({
      message: 'Warning message',
      status: STATUS_TYPE.WARNING,
    });
  });

  it('should return default message for WARNING type when message is not provided', () => {
    const result = buildToastRenderer({ type: STATUS_TYPE.WARNING });

    expect(result).toEqual({
      message: 'Warning!',
      status: STATUS_TYPE.WARNING,
    });
  });

  it('should return the correct color and message for ERROR type', () => {
    const result = buildToastRenderer({
      type: STATUS_TYPE.ERROR,
      message: 'Error occurred',
    });

    expect(result).toEqual({
      message: 'Error occurred',
      status: STATUS_TYPE.ERROR,
    });
  });

  it('should return default message for ERROR type when message is not provided', () => {
    const result = buildToastRenderer({ type: STATUS_TYPE.ERROR });

    expect(result).toEqual({
      message: 'Error!',
      status: STATUS_TYPE.ERROR,
    });
  });
});
