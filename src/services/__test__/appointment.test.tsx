import * as NextCache from 'next/cache';
import {
  addAppointment,
  ApiClient,
  apiClient,
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from '@/services';
import { MOCK_APPOINTMENTS } from '@/mocks';
import { AppointmentPayload } from '@/types';

jest.mock('next/cache');

describe('Appointment service tests', () => {
  it('getAppointments should return value correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      get: jest.fn().mockResolvedValue({
        data: MOCK_APPOINTMENTS,
        meta: {},
        error: null,
      }),
    } as unknown as ApiClient);

    const result = await getAppointments({});

    expect(result).toEqual({
      appointments: MOCK_APPOINTMENTS,
      error: null,
    });
  });

  it('getAppointments should handle API errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      get: jest.fn().mockResolvedValue({
        data: [],
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as unknown as ApiClient);

    const result = await getAppointments({});

    expect(result).toEqual({
      appointments: [],
      error: 'Something went wrong',
    });
  });

  it('getAppointments should handle API reject errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      get: jest.fn().mockRejectedValue({
        data: [],
        error: 'Something went wrong',
      }),
    } as unknown as ApiClient);

    const result = await getAppointments({});

    expect(result).toEqual({
      appointments: [],
      error: 'An unexpected error occurred in the request get appointments',
    });
  });

  it('addAppointment should add appointment correctly', async () => {
    jest.spyOn(NextCache, 'revalidateTag').mockImplementation(() => jest.fn());

    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      post: jest.fn().mockResolvedValue({
        data: MOCK_APPOINTMENTS[0],
        error: null,
      }),
    } as unknown as ApiClient);

    const result = await addAppointment(
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: MOCK_APPOINTMENTS[0],
      error: null,
    });
  });

  it('addAppointment should handle API errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      post: jest.fn().mockResolvedValue({
        error: JSON.stringify({
          error: {
            message: 'Failed to add appointment',
          },
        }),
      }),
    } as unknown as ApiClient);

    const result = await addAppointment(
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );
    expect(result).toEqual({
      appointment: null,
      error: 'Failed to add appointment',
    });
  });

  it('addAppointment should handle API reject errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      post: jest.fn().mockRejectedValue({
        data: [],
        error: 'Something went wrong',
      }),
    } as unknown as ApiClient);

    const result = await addAppointment(
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );
    expect(result).toEqual({
      appointment: null,
      error: 'An unexpected error occurred in add appointment',
    });
  });

  it('updateAppointment should update appointment correctly', async () => {
    jest.spyOn(NextCache, 'revalidateTag').mockImplementation(() => jest.fn());

    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      put: jest.fn().mockResolvedValue({
        data: MOCK_APPOINTMENTS[0],
        error: null,
      }),
    } as unknown as ApiClient);

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
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      put: jest.fn().mockResolvedValue({
        error: JSON.stringify({
          error: {
            message: 'Failed to update appointment',
          },
        }),
      }),
    } as unknown as ApiClient);

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
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      put: jest.fn().mockRejectedValue({
        data: [],
        error: 'Something went wrong',
      }),
    } as unknown as ApiClient);

    const result = await updateAppointment(
      '1',
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: null,
      error: 'An unexpected error occurred in update appointment',
    });
  });

  it('deleteAppointment should delete appointment correctly', async () => {
    jest.spyOn(NextCache, 'revalidateTag').mockImplementation(() => jest.fn());

    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      delete: jest.fn().mockResolvedValue({
        data: MOCK_APPOINTMENTS[0],
        error: null,
      }),
    } as unknown as ApiClient);

    const result = await deleteAppointment('1');

    expect(result).toEqual({
      appointment: MOCK_APPOINTMENTS[0],
      error: null,
    });
  });

  it('deleteAppointment should handle API errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      delete: jest.fn().mockResolvedValue({
        error: JSON.stringify({
          error: {
            message: 'Failed to delete appointment',
          },
        }),
      }),
    } as unknown as ApiClient);

    const result = await deleteAppointment('1');
    expect(result).toEqual({
      appointment: null,
      error: 'Failed to delete appointment',
    });
  });

  it('deleteAppointment should handle API reject errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      delete: jest.fn().mockRejectedValue({
        data: [],
        error: 'Something went wrong',
      }),
    } as unknown as ApiClient);

    const result = await deleteAppointment('1');

    expect(result).toEqual({
      appointment: null,
      error: 'An unexpected error occurred in delete appointment',
    });
  });
});
