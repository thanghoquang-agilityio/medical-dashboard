import { act } from '@testing-library/react';
import DashboardLayout from '../layout';
import { renderServerComponent } from '@/utils/test-util';

jest.mock('next-themes', () => ({
  ThemeProvider: jest.fn(),
  useTheme: jest.fn().mockReturnValue({
    theme: '',
    setTheme: jest.fn(),
  }),
}));

jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    handlers: jest.fn(),
    signOut: jest.fn(),
    auth: jest.fn(),
  }),
}));

describe('Dashboard layout test case', () => {
  const mockFetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(''),
  });

  global.fetch = mockFetch;

  const setup = async (
    props: Readonly<{
      children: React.ReactNode;
    }>,
  ) => act(() => renderServerComponent(<DashboardLayout {...props} />));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { asFragment } = await setup({ children: <div>mock children</div> });

    expect(asFragment()).toMatchSnapshot();
  });
});
