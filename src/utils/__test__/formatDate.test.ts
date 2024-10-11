import {
  formatDate,
  formatDateTime,
  formatDayMonthYear,
  formatNewDate,
  formatTimeAppointment,
  fromDateToNow,
  generateTimeOptions,
  isLaterThanCurrentTime,
} from '../formatDate';
import { MOCK_DATE, MOCK_DURATION_OPTIONS } from '@/mocks';

describe('formatDateTime', () => {
  jest.useFakeTimers().setSystemTime(new Date('2024-02-11T14:00:00Z'));

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('formatDateTime function', () => {
    it('should return formatted date time string when input is valid', () => {
      const input = MOCK_DATE.NOW;
      const expected = 'Feb 11, 2024 10:00 AM';

      expect(formatDateTime(input)).toBe(expected);
    });

    it('should return empty string when input is empty', () => {
      const input = '';

      expect(formatDateTime(input)).toBe(MOCK_DATE.INVALID);
    });

    it('should return empty string when input is invalid', () => {
      expect(formatDateTime(MOCK_DATE.INVALID)).toBe(MOCK_DATE.INVALID);
    });
  });

  describe('formatNewDate function', () => {
    it('should return formatted date string when input is valid', () => {
      const input = MOCK_DATE.FUTURE;
      const expected = 'Sep 18, 2024';

      expect(formatNewDate(input)).toBe(expected);
    });

    it('should return empty string when input is empty', () => {
      const input = '';

      expect(formatNewDate(input)).toBe(MOCK_DATE.INVALID);
    });

    it('should return empty string when input is invalid', () => {
      const input = MOCK_DATE.INVALID;

      expect(formatNewDate(input)).toBe(MOCK_DATE.INVALID);
    });
  });

  describe('formatTimeAppointment function', () => {
    it('should return formatted time string when input is valid', () => {
      const input = {
        start: MOCK_DATE.FUTURE,
        duration: '01:00',
      };
      const expected = '2:30 am to 3:30 am';

      expect(formatTimeAppointment(input)).toBe(expected);
    });

    it('should return empty string when input is empty', () => {
      const input = {
        start: '',
        duration: '',
      };

      expect(formatTimeAppointment(input)).toBe(
        `${MOCK_DATE.INVALID} to ${MOCK_DATE.INVALID}`,
      );
    });

    it('should return empty string when input is invalid', () => {
      const input = {
        start: MOCK_DATE.INVALID,
        duration: '',
      };

      expect(formatTimeAppointment(input)).toBe(
        `${MOCK_DATE.INVALID} to ${MOCK_DATE.INVALID}`,
      );
    });
  });

  describe('formatDate function', () => {
    it('should return formatted date string when input is valid', () => {
      const input = MOCK_DATE.FUTURE;
      const expected = { dayOfMonth: '18', dayOfWeek: 'Wed' };

      expect(formatDate(input)).toEqual(expected);
    });

    it('should return empty string when input is empty', () => {
      const input = '';
      const expected = {
        dayOfMonth: MOCK_DATE.INVALID,
        dayOfWeek: MOCK_DATE.INVALID,
      };

      expect(formatDate(input)).toEqual(expected);
    });

    it('should return empty string when input is invalid', () => {
      const input = MOCK_DATE.INVALID;
      const expected = {
        dayOfMonth: MOCK_DATE.INVALID,
        dayOfWeek: MOCK_DATE.INVALID,
      };

      expect(formatDate(input)).toEqual(expected);
    });
  });

  describe('formatDayMonthYear function', () => {
    const expectedInvalid = 'NaN undefined NaN';
    it('should return formatted date string when input is valid', () => {
      const input = MOCK_DATE.FUTURE;
      const expected = '17 Sep 2024';

      expect(formatDayMonthYear(input)).toBe(expected);
    });

    it('should return empty string when input is empty', () => {
      const input = '';

      expect(formatDayMonthYear(input)).toBe(expectedInvalid);
    });

    it('should return empty string when input is invalid', () => {
      const input = MOCK_DATE.INVALID;

      expect(formatDayMonthYear(input)).toBe(expectedInvalid);
    });
  });

  describe('fromDateToNow function', () => {
    const expected = 'a month ago';
    it('should return relative time when input is valid', () => {
      const input = MOCK_DATE.NOW;
      const expected = 'a few seconds ago';

      expect(fromDateToNow(input)).toBe(expected);
    });

    it('should return empty string when input is empty', () => {
      const input = '';

      expect(fromDateToNow(input)).toBe(expected);
    });

    it('should return empty string when input is invalid', () => {
      const input = MOCK_DATE.INVALID;

      expect(fromDateToNow(input)).toBe(expected);
    });
  });

  describe('isLaterThanCurrentTime function', () => {
    jest.useFakeTimers().setSystemTime(new Date(MOCK_DATE.NOW));

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should return true when input date is later than current time', () => {
      const input = MOCK_DATE.PASS;

      expect(isLaterThanCurrentTime(input)).toBe(true);
    });

    it('should return false when input date is not later than current time', () => {
      const input = MOCK_DATE.FUTURE;

      expect(isLaterThanCurrentTime(input)).toBe(false);
    });

    it('should return false when input is empty', () => {
      const input = '';

      expect(isLaterThanCurrentTime(input)).toBe(false);
    });

    it('should return false when input is invalid', () => {
      const input = MOCK_DATE.INVALID;

      expect(isLaterThanCurrentTime(input)).toBe(false);
    });
  });

  describe('generateTimeOptions function', () => {
    it('should return array of options', () => {
      expect(generateTimeOptions()).toEqual(MOCK_DURATION_OPTIONS);
    });
  });
});
