import { RenderResult, act, render } from '@testing-library/react';

// Mocks
import {
  MOCK_APPOINTMENTS,
  MOCK_COLUMNS_APPOINTMENTS,
  MOCK_PAGINATION,
} from '@/mocks';

// Components
import DataGrid, { DataTableProps } from '.';
import { RESULT_NOT_FOUND } from '@/constants';

const mockReplace = jest.fn();

// Mock next
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => {
    const params = new URLSearchParams();
    return { params };
  }),
  usePathname: jest.fn(),
  useRouter: () => ({ replace: mockReplace }),
}));

jest.mock('@/utils', () => ({
  cn: jest.fn(() => 'mocked-class'),
  getObjectValue: jest.fn(),
  formatTimeAppointment: jest.fn(),
  formatNewDate: jest.fn(),
}));

describe('DataGrid', () => {
  const mockProps = {
    data: MOCK_APPOINTMENTS,
    columns: MOCK_COLUMNS_APPOINTMENTS,
    pagination: MOCK_PAGINATION,
  } as DataTableProps<unknown>;

  let renderResult: RenderResult;
  const dataGridComponent = <DataGrid {...mockProps} />;

  beforeEach(async () => {
    renderResult = await act(() => render(dataGridComponent));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should matches snapshot', async () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue('1');

    const { container } = renderResult;

    expect(container).toMatchSnapshot();
  });

  it('Should show empty result', async () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue('1');

    const { getByText } = await act(() =>
      render(<DataGrid {...mockProps} data={[]} />),
    );

    expect(getByText(RESULT_NOT_FOUND)).toBeInTheDocument();
  });
});
