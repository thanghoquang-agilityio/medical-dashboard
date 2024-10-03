import { render, screen } from '@testing-library/react';
import { ChemistList, ChemistListProps } from '.';
import { MOCK_CHEMISTS_LIST } from '@/mocks/chemists';

describe('ChemistList', () => {
  const mockProps: ChemistListProps = {
    chemists: MOCK_CHEMISTS_LIST,
  };

  const setup = (props: ChemistListProps) => render(<ChemistList {...props} />);

  it('should render correctly', () => {
    const { asFragment } = setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display empty message when the chemists is empty', () => {
    setup({ ...mockProps, chemists: [] });

    const emptyMessage = screen.getByText(/result not found/i);

    expect(emptyMessage).toBeInTheDocument();
  });
});
