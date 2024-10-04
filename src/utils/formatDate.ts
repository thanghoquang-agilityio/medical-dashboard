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
  return dayjs(value).format('MMM D, YYYY h:mm A');
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

  return `${startTime.format('h:mm A')} to ${endTime.format('h:mm A')}`;
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
export const formatDayMonthYear = (isoString: string) => {
  const date = new Date(isoString);

  // Extract day and year
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  // Month names array
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = monthNames[date.getUTCMonth()];

  // Return the formatted date
  return `${day} ${month} ${year}`;
};

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

  return inputDate.isBefore(currentDate);
};

export const generateTimeOptions = (): Option[] => {
  const times: Option[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      // Format the hours and minutes to be two digits
      const hourStr = hour.toString().padStart(2, '0');
      const minuteStr = minutes.toString().padStart(2, '0');

      // Push the new object into the time array
      times.push({
        key: `${hourStr}:${minuteStr}`,
        label: `${hourStr}:${minuteStr}`,
      });
    }
  }

  return times;
};
