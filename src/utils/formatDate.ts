import { Option } from '@/types';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * @param value string - Date time string to format
 * @returns string - Formatted date time
 */
export const formatDateTime = (value: string) => {
  return dayjs(value).format('MMM D, YYYY h:mm a');
};

/**
 * @param value string - Date string to format
 * @returns string - Formatted date
 */
export const formatNewDate = (value: string) => {
  return dayjs(value).format('MMM D, YYYY');
};

/**
 * @param start string - Start time string to format
 * @param duration string - Duration time string to format
 * @returns string - Formatted date
 */
export const formatTimeAppointment = ({
  start,
  duration,
}: {
  start: string;
  duration: string;
}) => {
  const startTime = dayjs(start);
  const [hours, minutes, _] = duration.split(':').map(Number);
  const endTime = startTime.add(hours, 'hour').add(minutes, 'minute');

  return `${startTime.format('h:mm a')} to ${endTime.format('h:mm a')}`;
};

/**
 * Formats the input date string into an abbreviated day of the week and the day of the month.
 * @param input - The input date string in ISO 8601 format ('2024-09-11T06:30:00.000Z').
 * @returns An object containing:
 *   - dayOfWeek: Wed.
 *   - dayOfMonth: 11.
 */
export const formatDate = (input: string) => {
  const date = dayjs(input);
  dayjs.extend(advancedFormat);

  // Get the abbreviated day of the week
  const dayOfWeek = date.format('ddd');

  // Get the day of the month
  const dayOfMonth = date.format('DD');

  return { dayOfWeek, dayOfMonth };
};

/**
 * Format a date string from ISO string to Day Month Year.
 * @param {string} isoString - ISO string
 * @returns {string} Formatted date string
 */
export const formatDayMonthYear = (isoString: string) =>
  dayjs(isoString).format('D MMM YYYY');

/**
 * Converts an ISO date string to a relative time string.
 *
 * @param {string} isoString - The ISO date string.
 * @returns {string} - The relative time from the given date to now.
 *
 * @example
 * fromDateToNow('2024-09-20T14:00:00Z'); // "1 day ago"
 */
export const fromDateToNow = (isoString: string): string =>
  dayjs(isoString).fromNow();

export const isLaterThanCurrentTime = (isoString: string) => {
  const inputDate = dayjs(isoString);
  const currentDate = dayjs();

  return inputDate.isAfter(currentDate);
};

export const generateTimeOptions = (): Option[] => {
  const times: Option[] = [];
  const hour = 5;
  for (let i = 1; i <= hour * 4; i++) {
    const hour = Math.floor(i / 4);
    const minutes = (i % 4) * 15;

    const totalMinutes = hour * 60 + minutes;

    // Format the hours and minutes to be two digits
    const hourStr = hour.toString().padStart(2, '0');
    const minuteStr = minutes.toString().padStart(2, '0');

    // Push the new object into the time array
    times.push({
      key: totalMinutes.toString(),
      label: `${hourStr}:${minuteStr}`,
    });
  }

  return times;
};
