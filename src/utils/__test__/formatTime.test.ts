import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {
  convertMinutesToTime,
  convertTimeToMinutes,
  convertToTimeObject,
  generateISODate,
  formatStartDate,
  isFutureDate,
} from '../formatTime';
import { MOCK_DATE } from '@/mocks';
import { TimeInputValue } from '@nextui-org/react';

describe('formatStartDate function', () => {
  it('should format ISO string to "YYYY-MM-DD"', () => {
    const isoString = '2024-11-13T15:20:30Z';
    const expectedOutput = '2024-11-13';

    const result = formatStartDate(isoString);
    expect(result).toBe(expectedOutput);
  });

  it('should handle different times in the ISO string', () => {
    const isoString = '2024-11-13T08:45:00Z';
    const expectedOutput = '2024-11-13';

    const result = formatStartDate(isoString);
    expect(result).toBe(expectedOutput);
  });
});

describe('convertToTimeObject function', () => {
  it('should return correct time object for a valid ISO string', () => {
    const isoString = '2024-10-16T04:58:00.000Z'; // Example ISO string
    const result = convertToTimeObject(isoString);

    expect(result).toEqual({
      hour: 11,
      minute: 58,
      second: 0,
      millisecond: 0,
    });
  });

  it('should return undefined if the input string is empty', () => {
    const result = convertToTimeObject('');
    expect(result).toBeUndefined();
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

describe('generateISODate', () => {
  beforeAll(() => {
    dayjs.extend(utc);
  });

  it('should generate an ISO date string with the provided time values', () => {
    const inputTime = {
      hour: 14,
      minute: 30,
      second: 45,
      millisecond: 500,
    } as TimeInputValue;
    const dateTime = '2024-10-15'; // Example date

    const result = generateISODate(inputTime, dateTime);
    const expectedDate = dayjs('2024-10-15')
      .hour(14)
      .minute(30)
      .second(45)
      .millisecond(500)
      .toISOString();

    expect(result).toBe(expectedDate);
  });
});

describe('isFutureDate', () => {
  // Extend dayjs with plugins
  dayjs.extend(utc);
  dayjs.extend(timezone);
  beforeAll(() => {
    // Mock the current time to ensure consistent results across tests
    jest.useFakeTimers().setSystemTime(new Date('2024-10-15T12:00:00Z')); // Example fixed date
  });

  afterAll(() => {
    // Restore the actual timers after tests
    jest.useRealTimers();
  });

  it('should return true if the input date is in the future', () => {
    const futureDate = dayjs().add(1, 'day').toISOString();
    expect(isFutureDate(futureDate)).toBe(true);
  });

  it('should return false if the input date is in the past', () => {
    const pastDate = dayjs().subtract(1, 'day').toISOString();
    expect(isFutureDate(pastDate)).toBe(false);
  });

  it('should return false if the input date is the same as the current time', () => {
    const currentDate = dayjs().toISOString();
    expect(isFutureDate(currentDate)).toBe(false);
  });

  it('should handle different time zones correctly', () => {
    const futureDateBangkok = dayjs()
      .tz('Asia/Bangkok')
      .add(1, 'day')
      .toISOString();
    expect(isFutureDate(futureDateBangkok)).toBe(true);

    const pastDateBangkok = dayjs()
      .tz('Asia/Bangkok')
      .subtract(1, 'day')
      .toISOString();
    expect(isFutureDate(pastDateBangkok)).toBe(false);
  });
});
