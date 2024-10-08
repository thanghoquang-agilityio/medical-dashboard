import { render, screen } from '@testing-library/react';

// Types
import { UserModel } from '@/types';

// Components
import ChemistCard from '.';

// Mock
import { MOCK_CHEMISTS_LIST } from '@/mocks/chemists';

describe('ChemistCard test cases', () => {
  const mockProps: UserModel =
    MOCK_CHEMISTS_LIST[0].attributes.users_permissions_user.data.attributes;
  const setup = (props: UserModel) => render(<ChemistCard {...props} />);

  it('should render correctly', () => {
    const { asFragment } = setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display unknown when specialty is not defined', () => {
    setup({
      ...mockProps,
      specialtyId: {
        data: {
          id: '1',
          attributes: {
            name: '',
          },
        },
      },
    });

    const message = screen.getByText(/unknown/i);

    expect(message).toBeInTheDocument();
  });

  it('should display no description when there is no description', () => {
    setup({
      ...mockProps,
      description: '',
    });

    const message = screen.getByText(/no description/i);

    expect(message).toBeInTheDocument();
  });
});
