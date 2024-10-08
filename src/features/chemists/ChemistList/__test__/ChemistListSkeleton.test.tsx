import { render } from '@testing-library/react';
import { ChemistSkeleton } from '../ChemistSkeleton';

const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
  useRouter: () => ({ replace: mockReplace }),
  usePathname: jest.fn(),
}));

describe('ChemistListSkeleton test cases', () => {
  const setup = () => render(<ChemistSkeleton />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
