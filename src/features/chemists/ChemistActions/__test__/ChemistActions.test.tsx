import { act, fireEvent, render, screen } from '@testing-library/react';

import { MOCK_SPECIALTIES } from '@/mocks/chemists';
import ChemistActions, { ChemistActionsProps } from '../ChemistActions';

const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
  useRouter: () => ({ replace: mockReplace }),
  usePathname: jest.fn(),
}));

describe('ChemistActions', () => {
  const mockProps: ChemistActionsProps = {
    role: 'Admin',
    specialties: MOCK_SPECIALTIES,
  };

  const setup = async (props: ChemistActionsProps) =>
    act(() => render(<ChemistActions {...props} />));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { asFragment } = await setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should be able to filter by specialty', async () => {
    await setup(mockProps);

    const specialtyDropdown = screen.getByLabelText('Select Specialty');

    fireEvent.click(specialtyDropdown);

    const specialtyOption: HTMLLIElement = screen.getByRole('option', {
      name: /organic chemist/i,
    });

    fireEvent.click(specialtyOption);

    expect(specialtyOption.getAttribute('data-focus')).toBe('true');
  });
});
