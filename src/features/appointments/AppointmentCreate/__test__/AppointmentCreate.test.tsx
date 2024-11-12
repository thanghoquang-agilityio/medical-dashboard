import { act, render, renderHook, screen } from '@testing-library/react';
import { useDisclosure } from '@nextui-org/react';

import AppointmentCreate, { AppointmentCreateProps } from '..';
import { MOCK_USERS_LOGGED } from '@/mocks';

describe('AppointmentCreate', () => {
  const mockProps: AppointmentCreateProps = {
    userLogged: MOCK_USERS_LOGGED[0],
  };

  const setup = async (props: AppointmentCreateProps) =>
    act(() => render(<AppointmentCreate {...props} />));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { asFragment } = await setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders AppointmentModal with correct props when open', async () => {
    const { result } = renderHook(() => useDisclosure());
    await setup(mockProps);

    const createButton = screen.getByRole('button', {
      name: /create/i,
    });

    createButton.click();

    expect(result.current.onOpen).toBeTruthy();
  });
});
