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
import { API_ENDPOINT, EXCEPTION_ERROR_MESSAGE } from '@/constants';

jest.mock('next/cache');

describe('Appointment service tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockGet = jest.fn();
  const mockPost = jest.fn();
  const mockPut = jest.fn();
  const mockDelete = jest.fn();

  it('getAppointments should return value correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      get: mockGet.mockResolvedValue({
        data: MOCK_APPOINTMENTS,
        meta: {},
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await getAppointments({});

    expect(result).toEqual({
      appointments: MOCK_APPOINTMENTS,
      error: null,
    });

    expect(mockGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.APPOINTMENTS}?`,
      expect.anything(),
    );
  });

  it('getAppointments should handle API errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      get: mockGet.mockResolvedValue({
        data: [],
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await getAppointments({});

    expect(result).toEqual({
      appointments: [],
      error: 'Something went wrong',
    });

    expect(mockGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.APPOINTMENTS}?`,
      expect.anything(),
    );
  });

  it('getAppointments should handle API reject errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      get: mockGet.mockRejectedValue({}),
    } as Partial<ApiClient> as ApiClient);

    const result = await getAppointments({});

    expect(result).toEqual({
      appointments: [],
      error: EXCEPTION_ERROR_MESSAGE.GET('appointments'),
    });

    expect(mockGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.APPOINTMENTS}?`,
      expect.anything(),
    );
  });

  it('addAppointment should add appointment correctly', async () => {
    jest.spyOn(NextCache, 'revalidateTag').mockImplementation(() => jest.fn());

    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      post: mockPost.mockResolvedValue({
        data: MOCK_APPOINTMENTS[0],
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await addAppointment(
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: MOCK_APPOINTMENTS[0],
      error: null,
    });

    expect(mockPost).toHaveBeenCalledWith(`${API_ENDPOINT.APPOINTMENTS}`, {
      body: {
        data: MOCK_APPOINTMENTS[0],
      },
    });
  });

  it('addAppointment should handle API errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      post: mockPost.mockResolvedValue({
        error: JSON.stringify({
          error: {
            message: 'Failed to add appointment',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await addAppointment(
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: null,
      error: 'Failed to add appointment',
    });

    expect(mockPost).toHaveBeenCalledWith(`${API_ENDPOINT.APPOINTMENTS}`, {
      body: {
        data: MOCK_APPOINTMENTS[0],
      },
    });
  });

  it('addAppointment should handle API reject errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      post: mockPost.mockRejectedValue({}),
    } as Partial<ApiClient> as ApiClient);

    const result = await addAppointment(
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: null,
      error: EXCEPTION_ERROR_MESSAGE.ADD('appointment'),
    });

    expect(mockPost).toHaveBeenCalledWith(`${API_ENDPOINT.APPOINTMENTS}`, {
      body: {
        data: MOCK_APPOINTMENTS[0],
      },
    });
  });

  it('updateAppointment should update appointment correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      put: mockPut.mockResolvedValue({
        data: MOCK_APPOINTMENTS[0],
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateAppointment(
      '1',
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: MOCK_APPOINTMENTS[0],
      error: null,
    });

    expect(mockPut).toHaveBeenCalledWith(`${API_ENDPOINT.APPOINTMENTS}/1`, {
      body: {
        data: MOCK_APPOINTMENTS[0],
      },
    });
  });

  it('updateAppointment should handle API errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      put: mockPut.mockResolvedValue({
        error: JSON.stringify({
          error: {
            message: 'Failed to update appointment',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateAppointment(
      '1',
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: null,
      error: 'Failed to update appointment',
    });

    expect(mockPut).toHaveBeenCalledWith(`${API_ENDPOINT.APPOINTMENTS}/1`, {
      body: {
        data: MOCK_APPOINTMENTS[0],
      },
    });
  });

  it('updateAppointment should handle API reject errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      put: mockPut.mockRejectedValue({}),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateAppointment(
      '1',
      MOCK_APPOINTMENTS[0] as AppointmentPayload,
    );

    expect(result).toEqual({
      appointment: null,
      error: EXCEPTION_ERROR_MESSAGE.UPDATE('appointment'),
    });

    expect(mockPut).toHaveBeenCalledWith(`${API_ENDPOINT.APPOINTMENTS}/1`, {
      body: {
        data: MOCK_APPOINTMENTS[0],
      },
    });
  });

  it('deleteAppointment should delete appointment correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      delete: mockDelete.mockResolvedValue({
        data: MOCK_APPOINTMENTS[0],
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await deleteAppointment('1');

    expect(result).toEqual({
      appointment: MOCK_APPOINTMENTS[0],
      error: null,
    });

    expect(mockDelete).toHaveBeenCalledWith(`${API_ENDPOINT.APPOINTMENTS}/1`);
  });

  it('deleteAppointment should handle API errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      delete: mockDelete.mockResolvedValue({
        error: JSON.stringify({
          error: {
            message: 'Failed to delete appointment',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await deleteAppointment('1');

    expect(result).toEqual({
      appointment: null,
      error: 'Failed to delete appointment',
    });

    expect(mockDelete).toHaveBeenCalledWith(`${API_ENDPOINT.APPOINTMENTS}/1`);
  });

  it('deleteAppointment should handle API reject errors correctly', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValue({
      delete: mockDelete.mockRejectedValue({}),
    } as Partial<ApiClient> as ApiClient);

    const result = await deleteAppointment('1');

    expect(result).toEqual({
      appointment: null,
      error: EXCEPTION_ERROR_MESSAGE.DELETE('appointment'),
    });

    expect(mockDelete).toHaveBeenCalledWith(`${API_ENDPOINT.APPOINTMENTS}/1`);
  });
});
