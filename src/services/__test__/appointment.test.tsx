import * as NextCache from 'next/cache';
import {
  addAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from '@/services';
import { MOCK_APPOINTMENTS } from '@/mocks';
import { AppointmentPayload } from '@/types';
import { EXCEPTION_ERROR_MESSAGE } from '@/constants';

jest.mock('next/cache');
jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    auth: jest.fn(),
  }),
}));

describe('Appointment service tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockFetch = jest.fn();

  global.fetch = mockFetch;

  it('getAppointments should return value correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          data: MOCK_APPOINTMENTS,
          meta: {},
          error: null,
        }),
    });

    const result = await getAppointments({});

    expect(result).toEqual({
      appointments: MOCK_APPOINTMENTS,
      error: null,
    });
  });

  it('getAppointments should handle API errors correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          data: [],
          error: JSON.stringify({
            error: {
              message: 'Something went wrong',
            },
          }),
        }),
    });

    const result = await getAppointments({});

    expect(result).toEqual({
      appointments: [],
      error: 'Something went wrong',
    });
  });

  it('getAppointments should handle API reject errors correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject({}),
    });

    let result = await getAppointments({});

    expect(result).toEqual({
      appointments: [],
      error: EXCEPTION_ERROR_MESSAGE.GET('appointments'),
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Mock error')),
    });

    result = await getAppointments({});

    expect(result).toEqual({
      appointments: [],
      error: 'Mock error',
    });
  });

  it('addAppointment should add appointment correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          data: MOCK_APPOINTMENTS[0],
          error: null,
        }),
    });

    jest.spyOn(NextCache, 'revalidateTag').mockImplementation(() => jest.fn());

    const result = await addAppointment(
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: MOCK_APPOINTMENTS[0],
      error: null,
    });
  });

  it('addAppointment should handle API errors correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          error: JSON.stringify({
            error: {
              message: 'Failed to add appointment',
            },
          }),
        }),
    });

    const result = await addAppointment(
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: null,
      error: 'Failed to add appointment',
    });
  });

  it('addAppointment should handle API reject errors correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject({}),
    });

    let result = await addAppointment(
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: null,
      error: EXCEPTION_ERROR_MESSAGE.ADD('appointment'),
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Mock exception')),
    });

    result = await addAppointment(MOCK_APPOINTMENTS[0] as AppointmentPayload);

    expect(result).toEqual({
      appointment: null,
      error: 'Mock exception',
    });
  });

  it('updateAppointment should update appointment correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          data: MOCK_APPOINTMENTS[0],
          error: null,
        }),
    });

    const result = await updateAppointment(
      '1',
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: MOCK_APPOINTMENTS[0],
      error: null,
    });
  });

  it('updateAppointment should handle API errors correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          error: JSON.stringify({
            error: {
              message: 'Failed to update appointment',
            },
          }),
        }),
    });

    const result = await updateAppointment(
      '1',
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: null,
      error: 'Failed to update appointment',
    });
  });

  it('updateAppointment should handle API reject errors correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject({}),
    });

    let result = await updateAppointment(
      '1',
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: null,
      error: EXCEPTION_ERROR_MESSAGE.UPDATE('appointment'),
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('mock exception')),
    });
    result = await updateAppointment(
      '1',
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: null,
      error: 'mock exception',
    });
  });

  it('deleteAppointment should delete appointment correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          data: MOCK_APPOINTMENTS[0],
          error: null,
        }),
    });

    const result = await deleteAppointment('1');

    expect(result).toEqual({
      appointment: MOCK_APPOINTMENTS[0],
      error: null,
    });
  });

  it('deleteAppointment should handle API errors correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          error: JSON.stringify({
            error: {
              message: 'Failed to delete appointment',
            },
          }),
        }),
    });

    const result = await deleteAppointment('1');

    expect(result).toEqual({
      appointment: null,
      error: 'Failed to delete appointment',
    });
  });

  it('deleteAppointment should handle API reject errors correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject({}),
    });

    let result = await deleteAppointment('1');

    expect(result).toEqual({
      appointment: null,
      error: EXCEPTION_ERROR_MESSAGE.DELETE('appointment'),
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('mock exception')),
    });

    result = await deleteAppointment('1');

    expect(result).toEqual({
      appointment: null,
      error: 'mock exception',
    });
  });
});
