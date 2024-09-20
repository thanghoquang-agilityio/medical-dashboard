import { apiClient } from '../api';

describe('api service test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('apiClient.get will return value correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ test: 100 }),
      }),
    ) as jest.Mock;

    expect(await apiClient.get('/url')).toStrictEqual({ test: 100 });
  });

  it('apiClient.delete will return value correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ test: 100 }),
      }),
    ) as jest.Mock;

    expect(await apiClient.delete('/url')).toStrictEqual({
      test: 100,
    });
  });

  it('apiClient.post will return value correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ test: 100 }),
      }),
    ) as jest.Mock;

    expect(await apiClient.post('/url', { body: { data: 1 } })).toStrictEqual({
      test: 100,
    });
  });

  it('apiClient.put will return value correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ test: 100 }),
      }),
    ) as jest.Mock;

    expect(await apiClient.put('/url', { body: { data: 1 } })).toStrictEqual({
      test: 100,
    });
  });

  it('apiClient.put will return value correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(undefined),
      }),
    ) as jest.Mock;

    const put = async () => await apiClient.put('/url', { body: { data: 1 } });

    await expect(put).rejects.toThrow(Error);
  });

  it('apiClient.get will return value correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(undefined),
      }),
    ) as jest.Mock;

    const get = async () => await apiClient.get('/url');

    await expect(get).rejects.toThrow(Error);
  });

  it('apiClient.post will return value correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(undefined),
      }),
    ) as jest.Mock;

    const post = async () => await apiClient.post('/url', {});

    await expect(post).rejects.toThrow(Error);
  });

  it('apiClient.delete will return value correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(undefined),
      }),
    ) as jest.Mock;

    const callback = async () => await apiClient.delete('/url');

    await expect(callback).rejects.toThrow(Error);
  });
});
