// Libs
import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

// Contexts
import ToastProvider, { useToast } from '@/context/toast';
import { STATUS_TYPE } from '@/types';

// Component that uses the toast context
const ChildWithOpenToast = () => {
  const openToast = useToast();

  const handleOpenToast = () => {
    openToast({
      type: STATUS_TYPE.SUCCESS,
      message: 'Test open toast success',
    });
  };

  return (
    <div>
      Test Toast Context
      <button onClick={handleOpenToast}>Open Toast</button>
    </div>
  );
};

// Test Suite
describe('ToastProvider and useToast', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const setupRenderWithOpenToast = () => {
    return render(
      <ToastProvider>
        <ChildWithOpenToast />
      </ToastProvider>,
    );
  };

  it('should render and open toast correctly and display the content message', async () => {
    const { container, getByText, queryByTestId } = setupRenderWithOpenToast();

    // Snapshot test
    expect(container).toMatchSnapshot();

    const button = getByText('Open Toast');
    fireEvent.click(button);

    // Verify toast visibility and content
    await waitFor(() => {
      expect(queryByTestId('toast')).toBeTruthy();
      expect(getByText('Test open toast success')).toBeTruthy();
    });
  });
});
