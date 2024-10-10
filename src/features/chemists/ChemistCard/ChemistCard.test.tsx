import { render, screen } from '@testing-library/react';

// Components
import ChemistCard, { ChemistCardProps } from '.';

// Mock
import { MOCK_CHEMISTS_LIST } from '@/mocks/chemists';

describe('ChemistCard test cases', () => {
  const mockProps: ChemistCardProps = {
    data: MOCK_CHEMISTS_LIST[0].attributes.users_permissions_user.data
      .attributes,
    id: '1',
    isAdmin: true,
  };
  const setup = (props: ChemistCardProps) => render(<ChemistCard {...props} />);

  it('should render correctly', () => {
    const { asFragment } = setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  // TODO: will update test in another MR
  it.skip('should display unknown when specialty is not defined', () => {
    setup({
      ...mockProps,
    });

    const message = screen.getByText(/unknown/i);

    expect(message).toBeInTheDocument();
  });

  // TODO: will update test in another MR
  it.skip('should display no description when there is no description', () => {
    setup({
      ...mockProps,
    });

    const message = screen.getByText(/no description/i);

    expect(message).toBeInTheDocument();
  });
});
