import { renderServerComponent } from '@/utils/test-util';
import AppointmentPage from '../page';

jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    handlers: jest.fn(),
    signOut: jest.fn(),
    auth: jest.fn(),
  }),
}));

jest.mock('@/features/appointments/AppointmentsHistory', () => ({
  __esModule: true,
  default: () => <div>Mocked</div>,
}));

describe('Appointment Page test cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { asFragment } = await renderServerComponent(<AppointmentPage />);

    expect(asFragment()).toMatchSnapshot();
  });
});
