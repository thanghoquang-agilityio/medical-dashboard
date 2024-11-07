import { act, fireEvent, render, screen } from '@testing-library/react';

// Components
import ChemistCard, { ChemistCardProps } from '.';

// Mock
import { MOCK_CHEMISTS_LIST } from '@/mocks/chemists';
import { afterEach } from 'node:test';
import { UserModel } from '@/types';
import {
  updateUnpublishAppointment,
  updateUnpublishNotification,
  updateUnpublishUser,
} from '@/services';

jest.mock('@/services', () => ({
  updateUnpublishUser: jest.fn(),
  updateUnpublishAppointment: jest.fn(),
  updateUnpublishNotification: jest.fn(),
}));
describe('ChemistCard test cases', () => {
  const mockEdit = jest.fn();
  const mockProps: ChemistCardProps = {
    data: MOCK_CHEMISTS_LIST[0].attributes.users_permissions_user.data
      .attributes,
    id: '1',
    isAdmin: true,
    onEdit: mockEdit,
  };
  const mockUpdateUnpublishUser = updateUnpublishUser as jest.Mock;
  const mockUpdateUnpublishAppointment =
    updateUnpublishAppointment as jest.Mock;
  const mockUpdateUnpublishNotification =
    updateUnpublishNotification as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = (props: ChemistCardProps) => render(<ChemistCard {...props} />);

  it('should render correctly', async () => {
    const { asFragment } = await act(() => setup(mockProps));

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly without data', async () => {
    mockProps.data = {} as UserModel;

    const { asFragment } = await act(() => setup(mockProps));

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display no description when there is no description', async () => {
    mockProps.data.description = '';

    await act(() => setup(mockProps));

    const message = screen.getByText(/no description/i);

    expect(message).toBeInTheDocument();
  });

  it('should invoke edit function when clicking edit button', async () => {
    await act(() => setup(mockProps));

    const chemistCard: HTMLDivElement = screen.getByLabelText('chemist-card');

    fireEvent.mouseEnter(chemistCard);

    const editBtn: HTMLButtonElement = screen.getByLabelText('edit-btn');

    fireEvent.click(editBtn);

    expect(mockEdit).toHaveBeenCalled();
  });

  it('should handle error when there are errors during deleting', async () => {
    mockUpdateUnpublishUser.mockResolvedValueOnce({
      error: 'mock',
    });

    await act(() => setup(mockProps));

    const chemistCard: HTMLDivElement = screen.getByLabelText('chemist-card');

    fireEvent.mouseEnter(chemistCard);

    const deleteBtn: HTMLButtonElement = screen.getByLabelText('delete-btn');

    fireEvent.click(deleteBtn);

    const confirmBtn: HTMLButtonElement = screen.getByRole('button', {
      name: /yes/i,
    });

    await act(() => fireEvent.click(confirmBtn));

    expect(mockUpdateUnpublishUser).toHaveBeenCalled();
    expect(mockUpdateUnpublishAppointment).not.toHaveBeenCalled();
    expect(mockUpdateUnpublishNotification).not.toHaveBeenCalled();
  });

  it('should invoke delete function when clicking delete button', async () => {
    mockUpdateUnpublishUser.mockResolvedValueOnce({
      error: null,
    });

    await act(() => setup(mockProps));

    const chemistCard: HTMLDivElement = screen.getByLabelText('chemist-card');

    fireEvent.mouseEnter(chemistCard);

    const deleteBtn: HTMLButtonElement = screen.getByLabelText('delete-btn');

    fireEvent.click(deleteBtn);

    const confirmBtn: HTMLButtonElement = screen.getByRole('button', {
      name: /yes/i,
    });

    await act(() => fireEvent.click(confirmBtn));

    expect(mockUpdateUnpublishUser).toHaveBeenCalled();
    expect(mockUpdateUnpublishAppointment).toHaveBeenCalled();
    expect(mockUpdateUnpublishNotification).toHaveBeenCalled();
  });
});
