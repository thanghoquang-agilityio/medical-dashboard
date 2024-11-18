import { renderServerComponent } from '@/utils/test-util';
import Loading from '../loading';

jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    auth: jest.fn(),
  }),
}));

describe('AppointmentLoading test case', () => {
  it('should render correctly', async () => {
    const { asFragment } = await renderServerComponent(<Loading />);

    expect(asFragment()).toMatchSnapshot();
  });
});
