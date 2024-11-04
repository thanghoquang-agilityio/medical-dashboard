import { cookies } from 'next/headers';

import { MOCK_USER_SESSION } from '@/mocks';
import { apiClient } from '../api';
import { login, signup, logout } from '../auth';

const { token, email } = MOCK_USER_SESSION;

jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
    apiClientSession: jest.fn(),
  },
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue({
      value: 'mock',
    }),
    delete: jest.fn(),
  }),
}));

jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    handlers: jest.fn(),
    signOut: jest.fn(),
  }),
}));

jest.mock('../notificationFirebase.ts', () => ({
  unregisterFCM: jest.fn(),
}));

describe('Authorize tests', () => {
  it('login will return value correctly', async () => {
    jest.spyOn(apiClient, 'post').mockResolvedValue({
      error: null,
      jwt: token,
      user: MOCK_USER_SESSION,
    });
    jest.spyOn(apiClient, 'get').mockResolvedValue(MOCK_USER_SESSION);

    const result = await login({
      identifier: email!,
      password: 'password',
      remember: true,
    });
    expect(result).toStrictEqual({ error: null, user: MOCK_USER_SESSION });
  });

  it('login will return value correctly', async () => {
    jest.spyOn(apiClient, 'post').mockResolvedValue({
      error: null,
      jwt: token,
      user: MOCK_USER_SESSION,
    });
    jest
      .spyOn(apiClient, 'get')
      .mockResolvedValue({ error: 'Login Failed', user: null });

    const result = await login({
      identifier: email!,
      password: 'password',
      remember: true,
    });
    expect(result).toStrictEqual({
      error: 'Login Failed',
      user: null,
    });
  });

  it('login will return value correctly', async () => {
    jest.spyOn(apiClient, 'post').mockResolvedValue({
      error: JSON.stringify({
        error: {
          message: 'Login Failed',
        },
      }),
    });

    const result = await login({
      identifier: email!,
      password: 'password',
      remember: true,
    });
    expect(result).toStrictEqual({
      error: 'Login Failed',
      user: null,
    });
  });

  it('login will return value correctly', async () => {
    jest.spyOn(apiClient, 'post').mockRejectedValue({
      error: 'Login Failed',
      user: null,
    });

    const result = await login({
      identifier: email!,
      password: 'password',
      remember: true,
    });
    expect(result).toStrictEqual({
      error: 'An unexpected error occurred in the request login',
      user: null,
    });
  });

  it('signup will return value correctly', async () => {
    jest.spyOn(apiClient, 'post').mockResolvedValue({
      error: null,
    });

    const result = await signup({
      email: email!,
      username: email!,
      password: 'password',
    });
    expect(result).toBeTruthy();
  });

  it('login will return value correctly', async () => {
    jest.spyOn(apiClient, 'post').mockResolvedValue({
      error: JSON.stringify({
        error: {
          message: 'Signup Failed',
        },
      }),
    });

    const result = await signup({
      email: email!,
      username: email!,
      password: 'password',
    });
    expect(result).toStrictEqual({
      error: 'Signup Failed',
      jwt: '',
      user: null,
    });
  });

  it('signup will return value correctly', async () => {
    jest.spyOn(apiClient, 'post').mockRejectedValue({
      error: 'Signup Failed',
    });

    const result = await signup({
      email: email!,
      username: email!,
      password: 'password',
    });
    expect(result).toStrictEqual({
      error: 'An unexpected error occurred in the request register',
      jwt: '',
      user: null,
    });
  });

  it('logout will return value correctly', async () => {
    const mockCookies = {
      get: jest.fn().mockReturnValue(undefined),
      delete: jest.fn(),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookies);

    const result = await logout();

    expect(result);
  });
});
