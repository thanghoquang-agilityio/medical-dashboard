import { act, fireEvent, render, screen } from '@testing-library/react';
import ChemistForm, { ChemistFormProps } from '..';
import { getUserRoles } from '@/services';
import { ROLE, RolesResponse } from '@/types';

jest.mock('@/services/user.ts', () => ({
  getUserRoles: jest.fn(),
}));
describe('ChemistForm test cases', () => {
  window.URL.createObjectURL = jest.fn();
  const mockOnClose = jest.fn();
  const mockSpecialties = [
    {
      key: '1',
      label: 'Mock Specialty',
    },
  ];
  const mockProps: ChemistFormProps = {
    onClose: mockOnClose,
    id: '1',
    specialtyOptions: mockSpecialties,
    data: {
      email: 'mock@example.com',
      username: 'mockuser',
      password: 'mockpassword',
      avatar: {
        data: {
          id: 'mock_id',
          attributes: { url: '/mock_url', name: 'mock_name', id: '1' },
        },
      },
      description: 'mock description',
      rating: 0,
    },
  };
  const mockGetUserRoles = getUserRoles as jest.Mock;
  const mockRolesResponse: RolesResponse = {
    roles: [{ id: 1, name: ROLE.NORMAL_USER }],
    error: null,
  };
  const mockImageFile = new File(
    [
      new Uint8Array([
        137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82,
      ]),
    ],
    'mock-image.jpg',
    { type: 'image/jpeg' },
  );

  const setup = async (props: ChemistFormProps) =>
    await act(() => render(<ChemistForm {...props} />));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    mockGetUserRoles.mockReturnValueOnce(mockRolesResponse);

    const { asFragment } = await setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly without data and id', async () => {
    mockGetUserRoles.mockReturnValueOnce(mockRolesResponse);

    const { asFragment } = await setup({
      ...mockProps,
      data: undefined,
      id: undefined,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should able to typing valid data without error message', async () => {
    mockGetUserRoles.mockReturnValueOnce(mockRolesResponse);

    await setup({
      ...mockProps,
      data: undefined,
      id: undefined,
    });

    const uploadImgInput: HTMLInputElement = screen.getByTestId('upload-image');

    await act(() =>
      fireEvent.change(uploadImgInput, {
        target: {
          files: [mockImageFile],
        },
      }),
    );

    const usernameInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /username username/i,
    });

    fireEvent.change(usernameInput, { target: { value: 'mockuser' } });

    const emailInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /email email/i,
    });

    fireEvent.change(emailInput, {
      target: { value: 'mockuser@gmail.com' },
    });

    const passwordInput: HTMLInputElement = screen.getByPlaceholderText(
      'Please enter password',
    );

    fireEvent.change(passwordInput, { target: { value: 'Abcd@1234' } });

    const confirmPasswordInput: HTMLInputElement =
      screen.getByLabelText(/ confirm password/i);

    fireEvent.change(confirmPasswordInput, { target: { value: 'Abcd@1234' } });

    const specialtySelect: HTMLButtonElement =
      screen.getByTestId('specialty-select');

    await act(() => fireEvent.click(specialtySelect));

    const specialtyOption: HTMLOptionElement = screen.getByRole('option', {
      name: new RegExp(`${mockSpecialties[0].label}`, 'i'),
    });

    await act(() => fireEvent.click(specialtyOption));

    expect(usernameInput.value).toBe('mockuser');
    expect(emailInput.value).toBe('mockuser@gmail.com');
    expect(passwordInput.value).toBe('Abcd@1234');
    expect(confirmPasswordInput.value).toBe('Abcd@1234');
    expect(specialtySelect.value).toBe('1');
  });
});
