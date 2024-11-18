import { renderServerComponent } from '@/utils/test-util';
import ChemistPage from '../page';

jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    handlers: jest.fn(),
    signOut: jest.fn(),
    auth: jest.fn(),
  }),
}));

describe('Chemists Page test cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { asFragment } = await renderServerComponent(<ChemistPage />);

    expect(asFragment()).toMatchSnapshot();
  });
});
