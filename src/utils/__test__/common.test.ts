import {
  formatString,
  getDescriptionNotification,
  getGreeting,
  getObjectValue,
  getRoleIdByName,
  getStatusKey,
  transformSpecialties,
  transformUsers,
} from '../common';
import { APIRelatedResponse, APIResponse, ROLE, UserModel } from '@/types';
import { MOCK_USER_ROLE, MOCK_USERS_LOGGED, MOCK_SPECIALTIES } from '@/mocks';

describe('getObjectValue function', () => {
  it('should return value correctly value with key found', () => {
    const obj = { a: 1, b: 2 };
    const key = 'a';

    expect(getObjectValue(obj, key)).toEqual(1);
  });

  it('should return undefined when key is not found', () => {
    const obj = { a: 1, b: 2 };
    const key = 'c';

    expect(getObjectValue(obj, key)).toBeUndefined();
  });

  it('should return undefined when object is empty', () => {
    const obj = {};
    const key = 'c';

    expect(getObjectValue(obj, key)).toBeUndefined();
  });
});

describe('getDescriptionNotification function', () => {
  it('should return correct notification when userId not equal senderId', () => {
    const obj = {
      userId: '2',
      senderId: {
        data: {
          id: '1',
          attributes: {
            username: 'John',
          },
        },
      } as APIRelatedResponse<APIResponse<UserModel>>,
      content: 'created',
      time: '10 minutes ago',
    };
    const expected = 'John created at 10 minutes ago';

    expect(getDescriptionNotification(obj)).toEqual(expected);
  });

  it('should return notification when userId is empty', () => {
    const obj = {
      userId: '',
      senderId: {
        data: {
          id: '1',
          attributes: {
            username: 'Jessica',
          },
        },
      } as APIRelatedResponse<APIResponse<UserModel>>,
      content: 'updated',
      time: '6 minutes ago',
    };
    const expected = 'Jessica updated at 6 minutes ago';

    expect(getDescriptionNotification(obj)).toEqual(expected);
  });

  it('should return notification when userName is empty', () => {
    const obj = {
      userId: '2',
      senderId: {} as APIRelatedResponse<APIResponse<UserModel>>,
      content: 'updated',
      time: '6 minutes ago',
    };
    const expected = ' updated at 6 minutes ago';

    expect(getDescriptionNotification(obj)).toEqual(expected);
  });

  it('should return notification when userId is empty', () => {
    const obj = {
      userId: '1',
      senderId: {
        data: {
          id: '',
          attributes: {
            username: 'Jessica',
          },
        },
      } as APIRelatedResponse<APIResponse<UserModel>>,
      content: 'updated',
      time: '6 minutes ago',
    };
    const expected = 'Jessica updated at 6 minutes ago';

    expect(getDescriptionNotification(obj)).toEqual(expected);
  });

  it('should return correct notification when userId is equal senderId', () => {
    const obj = {
      userId: '1',
      senderId: {
        data: {
          id: '1',
        },
      } as APIRelatedResponse<APIResponse<UserModel>>,
      content: 'created',
      time: '5 hours ago',
    };
    const expected = 'You created at 5 hours ago';

    expect(getDescriptionNotification(obj)).toEqual(expected);
  });
});

describe('getGreeting function', () => {
  it('should return Good Morning when current hour is before 12', () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 10, 10, 11));

    expect(getGreeting()).toBe('Good Morning');
  });

  it('should return Good Afternoon when current hour is between 12 and 18', () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 10, 10, 13));

    expect(getGreeting()).toBe('Good Afternoon');
  });

  it('should return Good Evening when current hour is after 18', () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 10, 10, 20));

    expect(getGreeting()).toBe('Good Evening');
  });

  it('should return Good Evening when invalid hour', () => {
    jest.useFakeTimers().setSystemTime(new Date('Invalid Date'));

    expect(getGreeting()).toBe('Good Evening');
  });
});

describe('getStatusKey function', () => {
  it('should return key status incorrectly when value is invalid', () => {
    const value = 'invalid';

    expect(getStatusKey(value)).toBeUndefined();
  });

  it('should return key status correctly when value is new', () => {
    const value = 'new';
    const expected = 0;

    expect(getStatusKey(value)).toBe(expected);
  });

  it('should return key status correctly when value is meeting', () => {
    const value = 'meeting';
    const expected = 1;

    expect(getStatusKey(value)).toBe(expected);
  });

  it('should return key status correctly when value is canceled', () => {
    const value = 'cancelled';
    const expected = 2;

    expect(getStatusKey(value)).toBe(expected);
  });

  it('should return key status correctly when value is done', () => {
    const value = 'done';
    const expected = 3;

    expect(getStatusKey(value)).toBe(expected);
  });
});

describe('transformUsers function', () => {
  it('should return empty array when users is empty', () => {
    expect(transformUsers([])).toEqual([]);
  });

  it('should return array of options when users is not empty', () => {
    const expected = [
      {
        key: '30',
        label: 'john_smith@asnet.com.vn',
      },
      {
        key: '20',
        label: 'jessica_jane@asnet.com.vn',
      },
    ];

    expect(transformUsers(MOCK_USERS_LOGGED)).toEqual(expected);
  });
});

describe('transformSpecialties function', () => {
  it('should return default All option when specialties is empty', () => {
    const expected = [
      {
        key: 'all',
        label: 'All',
      },
    ];
    expect(transformSpecialties([])).toEqual(expected);
  });

  it('should return array of options when specialties is has data', () => {
    const expected = [
      {
        key: 'all',
        label: 'All',
      },
      {
        key: '1',
        label: 'Instrumentation',
      },
      {
        key: '2',
        label: 'Laboratory Chemist',
      },
      {
        key: '3',
        label: 'Organic Chemist',
      },
      {
        key: '4',
        label: 'Power Plant Chemist',
      },
      {
        key: '5',
        label: 'QC Chemist',
      },
    ];

    expect(transformSpecialties(MOCK_SPECIALTIES)).toEqual(expected);
  });
});

describe('formatString function', () => {
  it('should return empty string when input is empty', () => {
    expect(formatString('')).toBe('');
  });

  it('should return formatted string when input is not empty', () => {
    expect(formatString('Hello World')).toBe('hello_world');
  });

  it('should return formatted string when input have one word', () => {
    expect(formatString('Hello')).toBe('hello');
  });
});

describe('getRoleIdByName function', () => {
  it('should return role id when role name is found', () => {
    expect(getRoleIdByName(MOCK_USER_ROLE, ROLE.ADMIN)).toBe(2);
  });

  it('should return undefined when role is empty', () => {
    expect(getRoleIdByName([], ROLE.ADMIN)).toBeUndefined();
  });

  it('should return undefined when role name is not included', () => {
    expect(getRoleIdByName(MOCK_USER_ROLE, 'Super Admin')).toBeUndefined();
  });

  it('should return undefined when role name is empty', () => {
    expect(getRoleIdByName(MOCK_USER_ROLE, '')).toBeUndefined();
  });
});
