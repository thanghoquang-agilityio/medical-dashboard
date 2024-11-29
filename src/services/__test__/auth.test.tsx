import { cookies } from 'next/headers';

import { MOCK_USER_SESSION } from '@/mocks';
import { login, signup, logout } from '../auth';
import { EXCEPTION_ERROR_MESSAGE } from '@/constants';

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
  const mockFetch = jest.fn();

  global.fetch = mockFetch;
  it('should return user information when login successfully', async () => {
    const response = { error: null, jwt: token, user: MOCK_USER_SESSION };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(response),
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(MOCK_USER_SESSION),
    });

    const result = await login({
      identifier: email,
      password: 'password',
      remember: true,
    });

    expect(result).toStrictEqual({
      error: null,
      user: MOCK_USER_SESSION,
    });
  });

  it('should return error message when there is no information of login user', async () => {
    const response = { error: null, jwt: token, user: MOCK_USER_SESSION };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(response),
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ error: 'Login Failed', user: null }),
    });

    const result = await login({
      identifier: email,
      password: 'password',
      remember: true,
    });

    expect(result).toStrictEqual({
      error: 'Login Failed',
      user: null,
    });
  });

  it('should return error message when login failed', async () => {
    const response = {
      error: JSON.stringify({
        error: {
          message: 'Login Failed',
        },
      }),
    };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(response),
    });

    const result = await login({
      identifier: email,
      password: 'password',
      remember: true,
    });

    expect(result).toStrictEqual({
      error: 'Login Failed',
      user: null,
    });
  });

  it('should handle error exception when login', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(''),
    });

    let result = await login({
      identifier: email,
      password: 'password',
      remember: true,
    });

    expect(result).toStrictEqual({
      error: EXCEPTION_ERROR_MESSAGE.LOGIN,
      user: null,
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Mock exception')),
    });

    result = await login({
      identifier: email,
      password: 'password',
      remember: true,
    });

    expect(result).toStrictEqual({
      error: 'Mock exception',
      user: null,
    });
  });

  it('should return user information when signup successfully', async () => {
    const response = { error: null, jwt: token, user: MOCK_USER_SESSION };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(response),
    });

    const result = await signup({
      email: email,
      username: email,
      password: 'password',
    });

    expect(result).toEqual(response);
  });

  it('should return error message when login failed', async () => {
    const response = {
      error: JSON.stringify({
        error: {
          message: 'Signup Failed',
        },
      }),
    };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(response),
    });

    const result = await signup({
      email: email,
      username: email,
      password: 'password',
    });

    expect(result).toStrictEqual({
      error: 'Signup Failed',
      jwt: '',
      user: null,
    });
  });

  it('should handle error exception when singup', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject({}),
    });

    let result = await signup({
      email: email,
      username: email,
      password: 'password',
    });

    expect(result).toStrictEqual({
      error: EXCEPTION_ERROR_MESSAGE.REGISTER,
      jwt: '',
      user: null,
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Mock exception')),
    });

    result = await signup({
      email: email,
      username: email,
      password: 'password',
    });

    expect(result).toStrictEqual({
      error: 'Mock exception',
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
