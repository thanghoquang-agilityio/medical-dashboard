import { TimeInputValue } from '@nextui-org/react';
import {
  convertMinutesToTime,
  convertTimeToMinutes,
  convertToTimeObject,
  generateISODate,
  getCurrentDate,
} from '../formatTime';

const invalidDate = 'Invalid Date';

describe('getCurrentDate function', () => {
  it('should return current date in ISO format', () => {
    const currentDate = new Date().toISOString().split('T')[0];

    expect(getCurrentDate()).toBe(currentDate);
  });

  it('should return the passed date in ISO format', () => {
    const passedDate = 'Thu Oct 10 2023 14:41:18 GMT+0700 (Indochina Time)';
    const expected = '2023-10-10';

    expect(getCurrentDate(passedDate)).toBe(expected);
  });

  it('should return the passed date in ISO format', () => {
    const passedDate = '2024-02-10T07:43:12.000';
    const expected = '2024-02-10';

    expect(getCurrentDate(passedDate)).toBe(expected);
  });
});

describe('convertToTimeObject function', () => {
  it('should return object with hour, minute, second is NaN when input is invalid', () => {
    expect(convertToTimeObject(invalidDate)).toEqual({
      hour: NaN,
      minute: NaN,
      second: NaN,
    });
  });

  it('should return undefined when input is empty', () => {
    const input = '';

    expect(convertToTimeObject(input)).toBeUndefined();
  });

  it('should return object with hour, minute, second when input is valid', () => {
    const input = '2022-10-10T10:00:00.000';
    const expected = {
      hour: 10,
      minute: 0,
      second: 0,
    };

    expect(convertToTimeObject(input)).toEqual(expected);
  });

  it('should return object with hour, minute, second when input is valid', () => {
    const input = 'Thu Oct 10 2022 14:41:18 GMT+0700 (Indochina Time)';
    const expected = {
      hour: 2,
      minute: 41,
      second: 18,
    };

    expect(convertToTimeObject(input)).toEqual(expected);
  });
});

describe('generateISODate function', () => {
  it('should return ISO date string when input object is valid', () => {
    const inputTime = {
      hour: 3,
      minute: 0,
      second: 0,
      millisecond: 0,
    } as TimeInputValue;
    const inputDate = '2024-02-10';
    const expected = '2024-02-09T20:00:00.000Z';

    expect(generateISODate(inputTime, inputDate)).toBe(expected);
  });

  it('should return undefined when input object is invalid', () => {
    const inputTime = {} as TimeInputValue;
    const inputDate = '2024-02-10';

    expect(generateISODate(inputTime, inputDate)).toBe(
      '2024-02-09T17:00:00.000Z',
    );
  });
});

describe('convertMinutesToTime function', () => {
  it('should return time string when input is valid', () => {
    const input = '120';
    const expected = '02:00:00';

    expect(convertMinutesToTime(input)).toBe(expected);
  });

  it('should return empty string when input is invalid', () => {
    const input = 'invalid';

    expect(convertMinutesToTime(input)).toBe(invalidDate);
  });
});

describe('convertTimeToMinutes function', () => {
  it('should return minutes when input is valid', () => {
    const input = '01:30:00';
    const expected = 90;

    expect(convertTimeToMinutes(input)).toBe(expected);
  });

  it('should return 0 when input is invalid', () => {
    const input = 'invalid';

    expect(convertTimeToMinutes(input)).toBeNaN();
  });
});
