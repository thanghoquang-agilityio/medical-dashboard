import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

// Components
import { NavItem } from '..';

// Constants
import { NAVBAR_LINKS } from '@/constants';

const mockProps = {
  name: NAVBAR_LINKS[0].name,
  href: NAVBAR_LINKS[0].href,
  icon: NAVBAR_LINKS[0].icon,
};

describe('NavItem Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the NavItem with correct name and icon', () => {
    const { container, getByText } = render(
      <NavItem {...mockProps} isEnable isExpandSidebar />,
    );

    expect(getByText('Dashboard')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should apply active class when the path matches', () => {
    (usePathname as jest.Mock).mockReturnValue(NAVBAR_LINKS[0].href);

    const { getByRole } = render(
      <NavItem {...mockProps} isEnable isExpandSidebar />,
    );

    const link = getByRole('link');
    expect(link).toHaveClass('bg-linear-sidebar text-sky font-semibold');
  });

  it('should disable the link when isEnable is false', () => {
    (usePathname as jest.Mock).mockReturnValue(NAVBAR_LINKS[3].href);

    render(<NavItem {...mockProps} isEnable={false} isExpandSidebar />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('pointer-events-none');
  });
});
