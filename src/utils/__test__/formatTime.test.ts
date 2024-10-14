import {
  convertMinutesToTime,
  convertTimeToMinutes,
  convertToTimeObject,
  getCurrentDate,
} from '../formatTime';
import { MOCK_DATE } from '@/mocks';

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
    const passedDate = MOCK_DATE.NOW;
    const expected = '2024-02-11';

    expect(getCurrentDate(passedDate)).toBe(expected);
  });
});

describe('convertToTimeObject function', () => {
  it('should correctly convert a valid ISO string to a time object', () => {
    const isoString = '2024-10-12T14:30:45.123Z';
    const result = convertToTimeObject(isoString);
    expect(result).toEqual({
      hour: 14,
      minute: 30,
      second: 45,
      millisecond: 123,
    });
  });

  it('should handle edge case where time is midnight (00:00:00.000 UTC)', () => {
    const isoString = '2024-10-12T00:00:00.000Z';
    const result = convertToTimeObject(isoString);
    expect(result).toEqual({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
  });

  it('should handle different time zones by always returning UTC time', () => {
    const isoString = '2024-10-12T14:30:45.123-04:00'; // ISO string with time zone offset
    const result = convertToTimeObject(isoString);
    expect(result).toEqual({
      hour: 18, // 14:30 in UTC-4 is 18:30 in UTC
      minute: 30,
      second: 45,
      millisecond: 123,
    });
  });
});

describe('convertMinutesToTime function', () => {
  it('should return time string when input is valid', () => {
    const input = '120';
    const expected = '02:00:00';

    expect(convertMinutesToTime(input)).toBe(expected);
  });

  it('should return empty string when input is invalid', () => {
    const input = MOCK_DATE.INVALID;

    expect(convertMinutesToTime(input)).toBe(MOCK_DATE.INVALID);
  });
});

describe('convertTimeToMinutes function', () => {
  it('should return minutes when input is valid', () => {
    const input = '01:30:00';
    const expected = 90;

    expect(convertTimeToMinutes(input)).toBe(expected);
  });

  it('should return 0 when input is invalid', () => {
    const input = MOCK_DATE.INVALID;

    expect(convertTimeToMinutes(input)).toBeNaN();
  });
});
